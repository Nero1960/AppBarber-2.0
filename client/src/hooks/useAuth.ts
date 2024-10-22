import {getUserAuthenticated} from "@/api/AuthApi"
import { useQuery } from '@tanstack/react-query'


export const useAuth = () => {

    //Obtener todos los servicios
    const { data, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: getUserAuthenticated,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: false,
    });

    return { data, isLoading, isError, isSuccess, refetch }
}
