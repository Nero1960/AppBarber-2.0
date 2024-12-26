import { CartDetailsArray } from "@/types/index";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { Image } from "@chakra-ui/react";
import { formatToCordobas } from "@/utils/formatToCordobas";
import { Fragment } from "react/jsx-runtime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  decrementCartQuantity,
  incrementCartQuantity,
  removeFromCart,
} from "@/api/CartApi";
import { toast } from "sonner";
import { useMemo } from "react";

type CartListProductType = {
  listCarts: CartDetailsArray;
};
const CartListProduct = ({ listCarts }: CartListProductType) => {
  const queryClient = useQueryClient();
  //Eliminar producto del carrito
  const { mutate } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //Incrementar la cantidad de productos del carrito
  const { mutate: incrementMutate } = useMutation({
    mutationFn: incrementCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  //Decrementar la cantidad de productos del carrito
  const { mutate: decrementMutate } = useMutation({
    mutationFn: decrementCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleClickRemoveItem = (cartId: number, productId: number) => {
    const data = {
      cartId,
      productId,
    };
    mutate(data);
  };
  const handleClickIncrement = (cartId: number, productId: number) => {
    const data = {
      cartId,
      productId,
    };
    incrementMutate(data);
  };
  const handleClickDecrement = (cartId: number, productId: number) => {
    const data = {
      cartId,
      productId,
    };
    decrementMutate(data);
  };

  const total = useMemo(() => {
    return listCarts.reduce((acc, cur) => 
      acc + cur.product.reduce((acc2, cur2) => acc2 + cur2.CartDetails.subtotal, 0),
    0);
  }, [listCarts]);

  const disabled = useMemo(() => {
    return listCarts.reduce(
      (acc, cur) =>
        acc + cur.product.reduce(
          (acc2, cur2) => acc2 + cur2.CartDetails.quantity,
          0
        ),
      0
    ) === 0;
  }, [listCarts]);
  
 

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8">
        <div className="lg:col-span-2">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-brown-400">
                <TableHead className="text-white-500">Producto</TableHead>
                <TableHead className="text-white-500">Cantidad</TableHead>
                <TableHead className="text-white-500">Precio</TableHead>
                <TableHead className="text-white-500">Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listCarts.map((item) => (
                <Fragment key={item.cartId}>
                  {item.product.map((products) => (
                    <TableRow
                      key={products.productId}
                      className="border-brown-400 hover:bg-brown-500 duration-300"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Image
                            src={`${import.meta.env.VITE_IMAGE_URL}/${
                              products.image
                            }`}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                          <div>
                            <h3 className="font-semibold text-white-500">
                              {products.name}
                            </h3>
                            <p className="text-xs text-brown-200">
                              {products.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            className="bg-transparent border-none hover:bg-transparent"
                            size="icon"
                            onClick={() =>
                              handleClickDecrement(
                                products.CartDetails.cartId,
                                products.CartDetails.productId
                              )
                            }
                          >
                            <MinusCircle className="h-4 w-4 text-Primary-500" />
                          </Button>
                          <Button
                            type="button"
                            className="w-16 text-center bg-brown-500 border-none text-white-500"
                          >
                            {products.CartDetails.quantity}
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-transparent border-none hover:bg-transparent"
                            size="icon"
                            onClick={() =>
                              handleClickIncrement(
                                products.CartDetails.cartId,
                                products.CartDetails.productId
                              )
                            }
                          >
                            <PlusCircle className="h-4 w-4 text-Primary-500" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-white-500">
                        {formatToCordobas(products.CartDetails.unit_price)}
                      </TableCell>
                      <TableCell className="text-Primary-500">
                        {formatToCordobas(products.CartDetails.subtotal)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          className="hover:bg-brown-500"
                          size="icon"
                          onClick={() =>
                            handleClickRemoveItem(
                              products.CartDetails.cartId,
                              products.CartDetails.productId
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4 text-Primary-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Card className="bg-brown-500 border-none w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-white-500">Resumen del Pedido</span>
                <ShoppingCart className="h-6 w-6 text-Primary-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listCarts.map((item) => (
                  <Fragment key={item.cartId}>
                    {item.product.map((productItem) => (
                      <div
                        key={productItem.productId}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-white-500">
                          {productItem.name} (x
                          {productItem.CartDetails.quantity})
                        </span>
                        <span className="text-Primary-500">
                          {formatToCordobas(
                            productItem.CartDetails.unit_price *
                              productItem.CartDetails.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex justify-between items-center w-full text-lg font-semibold">
                <span className="text-white-500 font-bold">Total:</span>
                <span className="text-Primary-500 font-bold">{formatToCordobas(total)}</span>
              </div>
              <Button
                disabled={disabled}
                className="w-full bg-Primary-500 text-white-500 hover:bg-Primary-600 duration-300 disabled:cursor-not-allowed"
              >
                Proceder al Pago
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartListProduct;
