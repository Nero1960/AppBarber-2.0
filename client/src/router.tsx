import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//Autenticación
import AuthLayout from '@/layouts/AuthLayout';
import LoginView from '@/views/Auth/LoginView';
import RegisterView from '@/views/Auth/RegisterView';
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView';
import ConfirmAccountView from '@/views/Auth/ConfirmAccountView';
import ResetPasswordView from '@/views/Auth/NewPasswordView';
import RequestTokenView from '@/views/Auth/RequestTokenView';

//Not Found
import NotFoundView from '@/views/NotFoundView';

//Application
import AppLayout from '@/layouts/AppLayout';
import RequireAuth from '@/components/RequireAuth';
import IndexAppView from '@/views/App/IndexAppView';
import AboutAppView from '@/views/App/AboutAppView';
import ProfileAppView from '@/views/App/ProfileAppView';
import ChangePasswordView from '@/views/App/ChangePasswordView';
import AppointmentAppView from '@/views/App/AppointmentAppView';
import MyAppointmentView from '@/views/App/MyAppointmentView';
import PolicyAppView from '@/views/App/PolicyAppView';
import AppointmentEditView from '@/views/App/AppointmentEditView';
import ProductAppView from '@/views/App/ProductAppView';
import CartAppView from '@/views/App/CartAppView';
import LoginRequiredView from '@/views/App/LoginRequiredView';

//Administrador
import AdminLayout from '@/layouts/AdminLayout';
import DashboardAdmin from '@/views/Admin/DashboardAdmin';
import AppointmentAdmin from '@/views/Admin/AppointmentAdmin';
import ServicesAdmin from '@/views/Admin/ServicesAdmin';
import TestimonialAdmin from '@/views/Admin/TestimonialAdmin';
import BarbersAdmin from '@/views/Admin/BarbersAdmin';
import CustomerAdmin from '@/views/Admin/CustomerAdmin';

const router = () => {
    return (

        <BrowserRouter>
            <Routes>
                {/*La ruta principal muestra el home de la aplicación*/}
                <Route path='/' element={<Navigate to={'/app'} replace />} />

                {/*Autenticación*/}
                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView/>}/>
                    <Route path='/auth/register' element={<RegisterView/>}/>
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView/>}/>
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView/>}/>
                    <Route path='/auth/new-password' element={<ResetPasswordView/>}/>
                    <Route path='/auth/request-token' element={<RequestTokenView/>} />
                </Route>

                <Route path='/app' element={<AppLayout/>}>
                    {/*Públicas: navegación libre para visitantes*/}
                    <Route path='/app' index element={<IndexAppView/>}/>
                    <Route path='/app/about' element={<AboutAppView/>}/>
                    <Route path='/app/products' element={<ProductAppView/>}/>
                    <Route path='/app/policy' element={<PolicyAppView/>}/>
                    <Route path='/app/login-required' element={<LoginRequiredView/>}/>

                    {/*Protegidas: requieren iniciar sesión (citas, perfil y carrito)*/}
                    <Route element={<RequireAuth/>}>
                        <Route path='/app/appointment' element={<AppointmentAppView/>}/>
                        <Route path='/app/my-appointment' element={<MyAppointmentView/>}/>
                        <Route path='/app/my-appointment/update/:appointmentId' element={<AppointmentEditView/>}/>
                        <Route path='/app/profile' element={<ProfileAppView/>} />
                        <Route path='/app/profile/change-password/:userId' element={<ChangePasswordView/>} />
                        <Route path='/app/shop' element={<CartAppView/>}/>
                    </Route>
                </Route>

                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='/admin' index element={<DashboardAdmin/>}/>
                    <Route path='/admin/appointments' element={<AppointmentAdmin/>}/>
                    <Route path='/admin/services' element={<ServicesAdmin/>}/>
                    <Route path='/admin/testimonials' element={<TestimonialAdmin/>}/>
                    <Route path='/admin/barbers' element={<BarbersAdmin/>}/>
                    <Route path='/admin/customers' element={<CustomerAdmin/>}/>
                </Route>

                <Route path='*' element={<NotFoundView/>} />

            </Routes>
        </BrowserRouter>

    )
}

export default router;