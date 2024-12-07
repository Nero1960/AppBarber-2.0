import { getProducts } from '@/api/ProductsApi';
import { useQuery } from '@tanstack/react-query'


export const useProducts = () => {

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        retry: false,
        refetchOnWindowFocus: false,
    });

    
    return { data, isLoading, isError, isSuccess }
}

