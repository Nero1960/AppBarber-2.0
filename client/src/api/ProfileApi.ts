import api from "@/config/axios";
import { isAxiosError } from "axios";
import { AuthResetPassword, User, userSchemaUpdate } from "../types";



export const updateProfile = async ({ userId, formData} : {userId : User['userId'], formData: FormData}) => {
    try {
        
        const url = `/profile/update-profile/${userId}`;

        //Cambiar la configuración del contenido del formulario
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await api.put(url, formData, config);
        const response = userSchemaUpdate.safeParse(data)

        if(response.success){
            return response.data
        }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }

}

export const changePasswordProfile = async ({userId, formData} : {userId : User['userId'], formData: AuthResetPassword}) => {


    try {

        const url = `/profile/update-password/${userId}`;
        const { data } = await api.patch(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}