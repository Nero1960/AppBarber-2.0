import { Outlet } from 'react-router-dom'
import HeaderApp from '@/components/app/HeaderApp'
import FooterApp from '@/components/app/FooterApp'
import { Toaster } from 'sonner'


const AppLayout = () => {

    return (
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
