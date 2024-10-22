import api from "@/config/axios";
import { isAxiosError} from 'axios';
import { serviceSchemaArray, topServiceSchemaArray } from "../types";

export const getServices = async () => {

    try {

        const url = '/service/get-services';
        const { data } = await api.get(url);

        const response = serviceSchemaArray.safeParse(data);

        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }

}

export const getTopServices = async (period: string) => {
    try {
        const url = `/service/get-top-services?period=${period}`;
        const { data } = await api.get(url);
        console.log(data);

        const response = topServiceSchemaArray.safeParse(data);
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

