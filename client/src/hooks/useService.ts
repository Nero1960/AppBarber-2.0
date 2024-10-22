import { getServices } from '@/api/ServiceApi'
import { useQuery } from '@tanstack/react-query'


export const useService = () => {


    //Obtener todos los servicios
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
        retry: false,
        refetchOnWindowFocus: false,
    });

    
    return { data, isLoading, isError, isSuccess }
}

