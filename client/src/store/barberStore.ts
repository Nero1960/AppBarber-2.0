import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Barbers } from '@/types/index';

type BarbersStore = {
    barbers: Barbers,
    setBarbers: (barbers: Barbers) => void
}

export const useBarbersStore = create<BarbersStore>()(devtools(persist((set) => ({
    //Estado inicial de los servicios
    barbers: [],

    //Función para almacenar los servicios
    setBarbers: (barbers) => {
        set(() => ({
            barbers: barbers
        }));
    },
}),
 {
    name: 'barbers'
 }
)))