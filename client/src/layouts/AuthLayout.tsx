import Logo from '@/components/Logo'
import { Toaster } from 'sonner'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

const AuthLayout = () => {

    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();

    //Verificar si el usuario ya esta autenticado lo redirigimos a la app o a la administración

    useEffect(() => {

        if (user) {
            if (user.admin) {
                navigate('/admin')
            } else {
                navigate('/app');
            }
        }
    }, [])



    return (
        <>
            <main className='h-screen animate-fade-up animation-delay-1000'>
                <div className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
                    <div className='hidden lg:flex auth-image flex-col justify-between py-5 px-7'>
                        <Logo />
                        <div className='flex flex-col gap-y-5'>
                            <blockquote className='text-white-300  text-xl leading-8'>
                                <span className='font-bold text-3xl'>“</span> Bienvenido a Mojica's Barbershop
                                donde el estilo y la tradición se unen para ofrecerte la mejor experiencia de cuidado personal<span className='font-bold text-3xl'> ”</span>
                            </blockquote>

                            <span className='text-sm text-white-500 italic'>Mojica's Barbershop</span>
                        </div>
                    </div>

                    <div className='auth-image-mobile'>
                        <Outlet />
                    </div>

                </div>

                <Toaster
                    richColors
                    position='top-left'
                    closeButton={true}
                    duration={8000}
                />

            </main>

        </>
    )
}

export default AuthLayout