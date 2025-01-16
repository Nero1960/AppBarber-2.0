import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Barber, Barbers } from '@/types/index';

type BarbersStore = {
    barbers: Barbers,
    setBarbers: (barbers: Barbers) => void,
    addBarberStore: (barberUpdate: Barber) => void,
    updateBarberStore: (barberId: Barber) => void,
    deleteBarberStore: (barberId: Barber['barberId']) => void,
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

    //Función para agregar un barbero
    addBarberStore: (barber) => {
        set(state => ({
            barbers: [...state.barbers, barber]
        }))
    },

    //Función para actualizar un barbero
    updateBarberStore: (barberUpdate) => {
        set(state => ({
            barbers: state.barbers.map(barber => barber.barberId === barberUpdate.barberId ? barberUpdate : barber)
        }))

    },

    //Función para eliminar un barbero del Store
    deleteBarberStore: (barberId) => {
        set((state) => ({
            barbers: state.barbers.filter(barber => barber.barberId !== barberId)
        }))
    }
}),
    {
        name: 'barbers'
    }
)))