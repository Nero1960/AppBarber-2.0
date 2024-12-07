import {getAllBarbers} from "@/api/BarberApi"
import { useQuery } from '@tanstack/react-query'


export const useBarbers = () => {


    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['barbers'],
        queryFn: getAllBarbers,
        retry: false,
        refetchOnWindowFocus: false,
    });

    
    return { data, isLoading, isError, isSuccess }
}

