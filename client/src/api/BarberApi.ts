import api from "@/config/axios";
import { isAxiosError } from "axios";
import { Barber, barberAppointmentDataArray, barberPercentageSchemaArray, barberSchema, barberSchemaArray } from "../types";


export const newBarber = async (formData: FormData) => {
    try {
        const url = '/barber/new-barber';

        //Cambiar la configuración del contenido del formulario
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await api.post<Barber>(url, formData, config);
        const response = barberSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getAllBarbers = async () => {
    try {

        const { data } = await api('/barber/get-barbers');
        const response = barberSchemaArray.safeParse(data);

        if (response.success) {
            return response.data;
        }


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getBarberById = async (barberId: Barber['barberId']) => {
    try {

        const { data } = await api(`/barber/get-barber/${barberId}`);
        const response = barberSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const updateBarber = async ({ barberId, formData }: { barberId: number, formData: FormData }) => {
    try {
        const url = `/barber/update-barber/${barberId}`;
        //Cambiar la configuración del contenido del formulario
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await api.put<Barber>(url, formData, config);

        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const deleteBarber = async (barberId: Barber['barberId']) => {
    try {
        const url = `/barber/delete-barber/${barberId}`;
        const { data } = await api.delete<string>(url);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const barberAppointmentData = async () => {
    try {
        const url = '/barber/citas-barber';
        const { data } = await api.get(url);

        const response = barberAppointmentDataArray.safeParse(data);

        if(response.success){
            return response.data;
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const barberPercentage = async () => {
    try {
        const url = `/barber/ingresos-barber`;
        const { data } = await api.get(url);

        const response = barberPercentageSchemaArray.safeParse(data);
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }

}