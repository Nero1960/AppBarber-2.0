import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Products } from '../types';

type ProductStore = {
    products: Products,
    setProducts: (products: Products) => void,
}

export const useProductStore = create<ProductStore>()(devtools(persist((set) => ({
    //Estado inicial de los servicios
    products: [],

    //Función para almacenar los servicios
    setProducts: (products) => {
        set(() => ({
            products: products
        }));
    },
}),
 {
    name: 'products'
 }
)))