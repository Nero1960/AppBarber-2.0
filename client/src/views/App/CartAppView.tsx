import { getCarts } from "@/api/CartApi"
import CartListProduct from "@/components/app/cart/CartListProduct";
import { useQuery } from "@tanstack/react-query"
import { FaShoppingCart } from "react-icons/fa";


const CartAppView = () => {

    const {data} = useQuery({
        queryKey: ['cart'],
        queryFn: getCarts,
        retry: false,
        refetchOnWindowFocus: false,
    });

    
  if(data) return (
    <main className="animate-fade-up animation-delay-1000 px-8 lg:px-0 ">
        <h1 className="text-white-500 font-heading text-3xl text-center my-10 flex flex-col justify-center items-center gap-y-4">
          Carrito De Compras
          <FaShoppingCart className="text-Primary-500"/>
        </h1>

      <div className="max-w-4xl mx-auto px-5 mb-10">
        <div className="">
          <CartListProduct
            listCarts={data}
          />
        </div>
      </div>

    </main>
  )
}

export default CartAppView