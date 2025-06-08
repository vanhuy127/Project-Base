import { ROLE } from "@/constants";
import { ROUTE_PATH } from "@/constants/router";
import { AdminLayout } from "@/layout/admin";
import { DefaultLayout } from "@/layout/default";
import { useAuthStore } from "@/store";
import React, { lazy } from "react";
import { Navigate, useLocation, type RouteObject } from "react-router-dom";

const Account = lazy(() => import('@/pages/user/Account'));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const PrivateRoute = React.memo(({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
    const { user } = useAuthStore();
    const location = useLocation();
    if (!user) return <Navigate to={ROUTE_PATH.AUTH.LOGIN} state={{ from: location }} replace />;
    if (roles && !roles.includes(user.role)) return <Navigate to={ROUTE_PATH.UNAUTHORIZE} replace />;
    return <>{children}</>;
})

const PrivateRoutes: RouteObject[] = [
    {
        element: (
            <PrivateRoute roles={[ROLE.USER]}>
                <DefaultLayout />
            </PrivateRoute>),
        children: [
            { path: ROUTE_PATH.USER.ACCOUNT, element: <Account /> },
        ],
    }, {
        element: (
            <PrivateRoute roles={[ROLE.ADMIN]}>
                <AdminLayout />
            </PrivateRoute>),
        children: [
            { path: ROUTE_PATH.ADMIN.DASHBOARD, element: <Dashboard /> },
        ],
    },
];

export default PrivateRoutes;