import api from '@/config/axios';
import { AuthForgotPassword, AuthLogin, AuthRegister, AuthRequestToken, AuthResetPassword, ConfirmToken, userSchema } from '@/types/index'
import { isAxiosError } from 'axios'


export const login = async (formData: AuthLogin) => {

    try {

        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data);
        
    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }

}

export const registerUser = async (formData: AuthRegister) => {

    try {

        const url = `/auth/register`;
        const { data } = await api.post<string>(url, formData)
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const confirmAccount = async ({ token }: { token: ConfirmToken['token'] }) => {
    try {

        const url = `/auth/confirm-account`;
        const { data } = await api.post<string>(url, { token: token });
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}

export const forgotPassword = async (formData: AuthForgotPassword) => {


    try {

        const url = '/auth/forgot-password';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const validateToken = async (formData: ConfirmToken) => {

    try {

        const url = '/auth/validate-token';
        const { data } = await api.post<string>(url, formData);
        return data;


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }

}

export const resetPassword = async ({ formData, token }: { formData: AuthResetPassword, token: ConfirmToken['token'] }) => {

    try {

        const url = `/auth/reset-password/${token}`;
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }

}

export const requestConfirmationToken = async (formData: AuthRequestToken) => {

    try {

        const url = '/auth/request-token';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const getUserAuthenticated = async () => {

    const url = '/auth/profile';
    const { data } = await api.get(url);

    const response = userSchema.safeParse(data);


    if(response.success){
        return response.data;
    }
    
}