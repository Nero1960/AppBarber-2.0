import api from "@/config/axios";
import { isAxiosError } from "axios";
import { Barber, barberSchema, barberSchemaArray } from "../types";


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


export const getBarberById = async (barberId : Barber['barberId']) => {
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