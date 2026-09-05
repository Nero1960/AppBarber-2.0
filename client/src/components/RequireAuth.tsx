import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const RequireAuth = () => {

    const user = useAuthStore(state => state.user);
    const isLoading = useAuthStore(state => state.isLoading);
    const location = useLocation();

    //Mientras se rehidrata la sesión, evitamos un falso redirect
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div>Cargando sesión...</div>
            </div>
        );
    }

    //Sin sesión lo enviamos a la página informativa conservando el destino
    if (!user) {
        return <Navigate
            to={'/app/login-required'}
            replace
            state={{ from: location.pathname + location.search }}
        />;
    }

    return <Outlet />
}

export default RequireAuth
