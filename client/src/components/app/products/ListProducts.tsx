import { addToCart } from "@/api/CartApi"
import { Products } from "@/types/index"
import { formatToCordobas } from "@/utils/formatToCordobas"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Package } from "lucide-react"


type ListProductsType = {
    products: Products
}

const ListProducts = ({ products }: ListProductsType) => {


    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });

        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-16">
                {products.map((product) => (
                    <Card key={product.productId} className="w-full max-w-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-brown-500 border-none">
                        <div className="relative">
                            <img
                                alt={product.name}
                                className="h-48 w-full object-cover"
                                src={`${import.meta.env.VITE_IMAGE_URL}/${product.image}`}
                            />
                        </div>
                        <div className="flex flex-col justify-between h-48">
                            <CardHeader>
                                <CardTitle className="text-lg text-white-500">{product.name}</CardTitle>
                                <CardDescription className="line-clamp-2 text-brown-200">{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="text-2xl font-bold text-Primary-500">{formatToCordobas(product.price)}</p>

                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Package className="w-4 h-4 mr-1 text-Primary-500" />
                                        <span className="text-white-500">{product.inventory.quantity} in stock</span>
                                    </div>
                                </div>
                            </CardContent>

                        </div>

                        <CardFooter>
                            <Button
                                onClick={() => mutate(product.productId)}
                                className="w-full bg-Primary-500 hover:bg-Primary-600 duration-300">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Agregar al carrito
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default ListProducts