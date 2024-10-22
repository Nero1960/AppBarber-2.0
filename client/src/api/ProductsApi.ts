import api from "@/config/axios";
import { isAxiosError } from "axios";
import { productSchemaQuantityArray } from "../types";


export const getProducts = async () => {

    try {
        const url = `/product/get-products`;
        const { data } = await api.get(url);

        const response = productSchemaQuantityArray.safeParse(data);
        console.log(data)
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