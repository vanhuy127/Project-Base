import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ROUTE_PATH } from '@/constants/router'
import { ThemeControl } from '@/components/theme-control'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const navigationItems = [
        { name: "Trang chủ", href: "/" },
        { name: "Sản phẩm", href: "/products" },
        { name: "Dịch vụ", href: "/services" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <span className="font-bold text-xl text-slate-800">
                                Yuh<span className="text-blue-600">nav</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-all duration-200 relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Button asChild className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200">
                            <Link to={ROUTE_PATH.AUTH.LOGIN}>Đăng nhập</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="cursor-pointer text-blue-600 hover:bg-white/20 hover:text-yellow-300">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Mở menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-50">
                                <div className="flex flex-col space-y-4 mt-4">
                                    <div className="flex items-center justify-center">
                                        <span className="font-semibold text-2xl text-center text-blue-600">
                                            Menu
                                        </span>
                                    </div>

                                    {/* Mobile Navigation */}
                                    <nav className="flex flex-col space-y-2">
                                        {navigationItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="text-sm font-medium py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-gray-700 hover:text-purple-700"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Mobile Actions */}
                                    <div className="flex flex-col space-y-3 pt-4 border-t border-purple-200">
                                        <Button className=" cursor-pointer mx-5 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg">
                                            Đăng nhập
                                        </Button>
                                    </div>

                                    <ThemeControl />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header
