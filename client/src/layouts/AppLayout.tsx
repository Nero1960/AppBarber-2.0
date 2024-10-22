import { Navigate, Outlet } from 'react-router-dom'
import HeaderApp from '@/components/app/HeaderApp'
import FooterApp from '@/components/app/FooterApp'
import { useAuthStore } from '@/store/authStore'
import { Toaster } from 'sonner'


const AppLayout = () => {

    const user = useAuthStore(state => state.user);

    if (!user) return <Navigate to={'/'} />

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