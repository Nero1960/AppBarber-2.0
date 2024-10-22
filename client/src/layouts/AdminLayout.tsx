import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Calendar,
    ChevronLeft,
    Home,
    Menu,
    Package,
    Search,
    Settings,
    ShoppingCart,
    Users,
    User
} from 'lucide-react'
import { Link, Navigate, Outlet, useLocation} from 'react-router-dom'
import Logo from '@/components/Logo'
import { useAuthStore } from '@/store/authStore'
import ProfileMenu from '@/components/app/ProfileMenu'

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const user = useAuthStore(state => state.user);
    const location = useLocation();

    if (!user) return <Navigate to={'/'} />


    if(user)return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`bg-brown-500 w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static absolute z-30`}>
                <div className="flex items-center justify-between p-4">
                    <Logo />
                    <Button variant={'ghost'} size="icon" className="md:hidden hover:bg-transparent" onClick={() => setSidebarOpen(false)}>
                        <ChevronLeft className="h-6 w-6 text-white-500" />
                    </Button>
                </div>
                <ScrollArea className="flex-grow">
                    <nav className="p-4 space-y-2">
                        <Link to="/admin" className={`${location.pathname === '/admin' ? 'bg-Primary-500' : 'bg-transparent' } flex items-center space-x-2 text-white-500 hover:bg-Primary-500 duration-200 rounded-md p-2`}>
                            <Home className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/admin/appointments"className={`${location.pathname === '/admin/appointments' ? 'bg-Primary-500' : 'bg-transparent' } flex items-center space-x-2 text-white-500 hover:bg-Primary-500 duration-200 rounded-md p-2`}>
                            <Calendar className="h-5 w-5" />
                            <span>Citas</span>
                        </Link>
                        <Link to="/admin/products"className={`${location.pathname === '/admin/products' ? 'bg-Primary-500' : 'bg-transparent' } flex items-center space-x-2 text-white-500 hover:bg-Primary-500 duration-200 rounded-md p-2`}>
                            <Package className="h-5 w-5" />
                            <span>Productos</span>
                        </Link>
                        <Link to="/admin/sales"className={`${location.pathname === '/admin/sales' ? 'bg-Primary-500' : 'bg-transparent' } flex items-center space-x-2 text-white-500 hover:bg-Primary-500 duration-200 rounded-md p-2`}>
                            <ShoppingCart className="h-5 w-5" />
                            <span>Ventas</span>
                        </Link>
                        <Link to="/admin/barbers"className={`${location.pathname === '/admin/barbers' ? 'bg-Primary-500' : 'bg-transparent' } flex items-center space-x-2 text-white-500 hover:bg-Primary-500 duration-200 rounded-md p-2`}>
                            <User className="h-5 w-5" />
                            <span>Barberos</span>
                        </Link>
                        <Link to="/admin/users"className={`${location.pathname === '/admin/users' ? 'bg-Primary-500' : 'bg-transparent' } flex items-center space-x-2 text-white-500 hover:bg-Primary-500 duration-200 rounded-md p-2`}>
                            <Users className="h-5 w-5" />
                            <span>Clientes</span>
                        </Link>
                    </nav>
                </ScrollArea>
                <div className="p-4 ">
                    <Link to="/admin/settings"className={`${location.pathname === '/admin/settings' ? 'bg-Primary-500' : 'bg-transparent' } flex items-center space-x-2 text-white-500 hover:bg-Primary-500 duration-200 rounded-md p-2`}>
                        <Settings className="h-5 w-5" />
                        <span>Configuración</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-brown-500 flex items-center justify-between p-6">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="md:hidden mr-2 hover:bg-brown-500" onClick={() => setSidebarOpen(true)}>
                            <Menu className="h-6 w-6 text-white-500" />
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white-500" />
                            <Input type="search" placeholder="Buscar..." className="pl-8 pr-4 bg-black-500 placeholder:text-white-500 text-white-500 outline-none" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <ProfileMenu/>
                    </div>
                </header>


                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}