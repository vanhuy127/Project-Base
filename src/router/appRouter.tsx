import { useRoutes } from "react-router-dom";
import PrivateRoutes from "@/router/private";
import GlobalRoutes from "@/router/global";
import OnLyNotAuthRoutes from "./onlyNotAuth";
export const AppRouter = () => {

    const routing = useRoutes([...PrivateRoutes, ...GlobalRoutes, ...OnLyNotAuthRoutes]);

    return <>{routing}</>;
}
