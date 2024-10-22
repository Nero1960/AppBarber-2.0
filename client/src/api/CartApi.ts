import api from "@/config/axios";
import { isAxiosError } from "axios";
import { CartDetails, cartProductDetailsSchemaArray, Product } from "../types";


export const addToCart = async (productId: Product['productId']) => {
    try {
        const url = '/cart/add-to-cart';
        const { data } = await api.post<string>(url, {
            productId
        })
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getCarts = async () => {
    try {
        const url = '/cart/get-carts';
        const { data } = await api.get(url);

        const response = cartProductDetailsSchemaArray.safeParse(data)
        console.log(data)

        console.log(response)
        if (response.success) {
            return response.data;

        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const incrementCartQuantity = async ({ cartId, productId }: { cartId: CartDetails['cartId'], productId: Product['productId'] }) => {
    try {

        const url = `/cart/increment-product/${cartId}/product/${productId}`;
        const { data } = await api.patch<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const decrementCartQuantity = async ({ cartId, productId }: { cartId: CartDetails['cartId'], productId: Product['productId'] }) => {
    try {

        const url = `/cart/decrement-product/${cartId}/product/${productId}`;
        const { data } = await api.patch<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


export const removeFromCart = async ({ cartId, productId }: { cartId: CartDetails['cartId'], productId: Product['productId'] }) => {
    try {
        const url = `/cart/delete-product-cart/${cartId}/product/${productId}`;
        const { data } = await api.delete<string>(url);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}