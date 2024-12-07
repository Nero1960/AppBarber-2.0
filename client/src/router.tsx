import {  BrowserRouter, Routes, Route } from 'react-router-dom'

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
import IndexAppView from '@/views/App/IndexAppView';
import AboutAppView from '@/views/App/AboutAppView';

//User 
import ProfileAppView from '@/views/App/ProfileAppView';
import ChangePasswordView from '@/views/App/ChangePasswordView';
import AppointmentAppView from '@/views/App/AppointmentAppView';
import MyAppointmentView from '@/views/App/MyAppointmentView';
import PolicyAppView from '@/views/App/PolicyAppView';
import AppointmentEditView from '@/views/App/AppointmentEditView';
import ProductAppView from './views/App/ProductAppView';
import CartAppView from './views/App/CartAppView';

//Administrador
import AdminLayout from './layouts/AdminLayout';
import DashboardAdmin from './views/Admin/DashboardAdmin';
import AppointmentAdmin from './views/Admin/AppointmentAdmin';
import ServicesAdmin from './views/Admin/ServicesAdmin';
import TestimonialAdmin from './views/Admin/TestimonialAdmin';
import BarbersAdmin from './views/Admin/BarbersAdmin';

const router = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path='/' index element={<LoginView/>}/>
                    <Route path='/register' element={<RegisterView/>}/>
                    <Route path='/forgot-password' element={<ForgotPasswordView/>}/>
                    <Route path='/confirm-account' element={<ConfirmAccountView/>}/>
                    <Route path='/new-password' element={<ResetPasswordView/>}/>
                    <Route path='/request-token' element={<RequestTokenView/>} />
                </Route>

                <Route path='/app' element={<AppLayout/>}>
                    <Route path='/app' index element={<IndexAppView/>}/>
                    <Route path='/app/about' element={<AboutAppView/>}/>
                    <Route path='/app/profile' element={<ProfileAppView/>} />
                    <Route path='/app/profile/change-password/:userId' element={<ChangePasswordView/>} />
                    <Route path='/app/appointment' element={<AppointmentAppView/>}/>
                    <Route path='/app/my-appointment' element={<MyAppointmentView/>}/>
                    <Route path='/app/my-appointment/update/:appointmentId' element={<AppointmentEditView/>}/>
                    <Route path='/app/products' element={<ProductAppView/>}/>
                    <Route path='/app/shop' element={<CartAppView/>}/>
                    <Route path='/app/policy' element={<PolicyAppView/>}/>
                </Route>

                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='/admin' element={<DashboardAdmin/>}/>
                    <Route path='/admin/appointments' element={<AppointmentAdmin/>}/>
                    <Route path='/admin/services' element={<ServicesAdmin/>}/>
                    <Route path='/admin/testimonials' element={<TestimonialAdmin/>}/>
                    <Route path='/admin/barbers' element={<BarbersAdmin/>}/>
                </Route>

                <Route path='*' element={<NotFoundView/>} />

            </Routes>
        </BrowserRouter>

    )
}

export default router;