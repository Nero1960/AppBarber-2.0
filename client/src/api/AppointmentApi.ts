import api from "@/config/axios";
import { isAxiosError } from "axios";
import {
    AppointmentCancellationForm,
     appointmentCompleteSchema, 
     appointmentCompleteSchemaArray, 
     Appointments, 
     AppointmentService, 
     AppointmentsForm, 
     monthlyRevenueAppointmentSchemaArray
} from "@/types/index";

export const createAppointment = async (formData : AppointmentsForm) => {
    try {

        const url = `/appointment/make-appointment`;
        const { data } = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const getAppointmentsUserAuth = async () => {
    try {

        const url = `/appointment/get-appointment-user`;
        const { data } = await api.get(url);

        const response = appointmentCompleteSchemaArray.safeParse(data);
    
        if(response.success){
            return response.data;
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getAppointmentById = async ( appointmentId  : AppointmentService['appointmentId']) => {
    try {

        const url = `/appointment/get-appointment/${appointmentId}`;
        const { data } = await api.get(url);

        const response = appointmentCompleteSchema.safeParse(data);
        
        
        if(response.success){
            return response.data;
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


export const updateAppointment = async ({appointmentId, formData} : {appointmentId : AppointmentService['appointmentId'], formData: AppointmentsForm}) => {
    try {
        const url = `/appointment/update-appointment/${appointmentId}`;
        const { data } = await api.put<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const cancelAppointment = async (appointmentId : AppointmentService['appointmentId']) => {
    try {
        const url = `/appointment/cancel-appointment/${appointmentId}`;
        const { data } = await api.patch<string>(url);
        return data;
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const deleteAppointment = async (appointmentId: Appointments['appointmentId']) => {
    try {
        const url = `/appointment/delete-appointment/${appointmentId}`;
        const { data } = await api.delete<string>(url);
        return data;
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const cancellationAppointmentMessage = async (formData : AppointmentCancellationForm) => {
    try {
        const url = '/appointment/cancellation-reason';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const monthlyRevenueChart = async (month: number, year: number) => {
    try {
        const url = `/appointment/monthly-revenue?month=${month}&year=${year}`;
        const { data } = await api.get(url);

        const response = monthlyRevenueAppointmentSchemaArray.safeParse(data)
        
        if(response.success){
            return response.data;
        }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}