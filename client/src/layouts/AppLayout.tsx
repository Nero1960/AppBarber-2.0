import { Navigate, Outlet } from 'react-router-dom'
import HeaderApp from '@/components/app/HeaderApp'
import FooterApp from '@/components/app/FooterApp'
import { useAuthStore } from '@/store/authStore'
import { Toaster } from 'sonner'


const AppLayout = () => {

    const user = useAuthStore(state => state.user);
    const isLoading = useAuthStore(state => state.isLoading);  // ← NUEVO

    // ← NUEVO: Mientras carga, muestra algo (evita pantalla blanca)
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <div>Cargando sesión...</div>
        </div>;
    }

    // Una vez que terminó de cargar, si no hay usuario, redirige
    if (!user) return <Navigate to={'/'} replace />;

    if (user) return (
        <>

            <HeaderApp />

            <Outlet />

            <FooterApp />

            <Toaster
                richColors
                position='top-left'
                closeButton={true}
                duration={8000}
            />

        </>
    )
}

export default AppLayout