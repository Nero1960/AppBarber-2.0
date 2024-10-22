import AnimationApp from "@/components/app/AnimationApp"
import { useProducts } from "@/hooks/useProducts";
import { useProductStore } from "@/store/productStore"
import { useEffect } from "react";
import ListProducts from "@/components/app/products/ListProducts";

const ProductAppView = () => {

    //Almacenar en el estado global de zustand
    const products = useProductStore(state => state.products);
    const setProducts = useProductStore(state => state.setProducts);
    //Obtener los datos de los servicios desde la API
    const { data } = useProducts();

    useEffect(() => {
        if (data) setProducts(data);
    }, [data]);


    if (products) return (
        <AnimationApp>
            <main className="max-w-4xl mx-auto px-8 lg:px-0 lg:my-16">
                <h1 className="text-white font-heading text-4xl text-white-500 text-center">Nuestros Productos</h1>
                <p className="text-brown-200 text-sm text-center mx-auto lg:max-w-[50%] mt-2">Descubre nuestra línea de productos premium especialmente seleccionados para el cuidado de tu cabello y barba.</p>

                <ListProducts
                    products={products}
                />
                
            </main>
        </AnimationApp>
    )
}

export default ProductAppView