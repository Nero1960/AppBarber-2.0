import api from "@/config/axios";
import { isAxiosError } from 'axios';
import { Service, serviceSchema, serviceSchemaArray, topServiceSchemaArray } from "../types";

export const getServices = async () => {

    try {

        const url = '/service/get-services';
        const { data } = await api.get(url);

        const response = serviceSchemaArray.safeParse(data);

        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const getServiceById = async (serviceId: Service['serviceId']) => {
    try {
        const url = `/service/get-services/${serviceId}`;
        const { data } = await api.get(url);

        const response = serviceSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getTopServices = async (period: string) => {
    try {
        const url = `/service/get-top-services?period=${period}`;
        const { data } = await api.get(url);

        const response = topServiceSchemaArray.safeParse(data);
        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const updateServiceAdmin = async ({ formData, serviceId }: { formData: Service, serviceId: Service['serviceId'] }) => {

    try {
        const url = `/service/update-service/${serviceId}`;
        const { data } = await api.put(url, formData);

        const response = serviceSchema.safeParse(data);
        console.log(response)
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export const addNewService = async ( {formData} : {formData : Service}) => {
    try {
        const url = '/service/add-services';
        const {data } = await api.post(url, formData )

        const response = serviceSchema.safeParse(data);
        console.log(response)
        if(response.success){
            return response.data;
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }

}

export const deleteServiceById = async (serviceId: Service['serviceId']) => {
    try {
        const url = `/service/delete-service/${serviceId}`;
        const { data } = await api.delete<string>(url);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }

}