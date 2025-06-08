import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from "@/store";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
    const { setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: string })?.from || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: FormData) => {
        // Fake login logic
        setUser({ id: '1', name: 'User', role: 'user' });
        navigate(from, { replace: true });
    };

    return (
        <Card className="w-full border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-8">
                <div className="flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 shadow-lg">
                        <LockIcon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
                            <MailIcon className="h-4 w-4 text-blue-500" />
                            Email
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className={`pl-4 pr-4 py-3 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-200"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 font-medium">
                                <LockIcon className="h-4 w-4 text-purple-500" />
                                Password
                            </Label>
                            <a href="#" className="text-xs text-blue-600 hover:text-blue-500 transition-colors font-medium">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                className={`pl-4 pr-12 py-3 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-200"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Signing in...
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )

}

export default Login
