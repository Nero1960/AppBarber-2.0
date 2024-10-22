import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User, UserUpdate } from '@/types/index';

type AuthUserState = {
    user: User | null;
    setUser: (user: User) => void;
    updateUser: (userUpdate: UserUpdate) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthUserState>()(devtools(persist((set) => ({
    //Estado inicial del usuario
    user: null,

    //Función para almacenar el usuario
    setUser: (user) => {
        set(() => ({
            user: user
        }));
    },

    // Función para actualizar al usuario
    updateUser: (userUpdate: UserUpdate) => { // Asegúrate de usar UserUpdate aquí
        set((state) => ({
            /*Si existe el usuario creamos un objeto combinado con los datos del usuario y los datos actualizado, en caso contrario definimos a null*/
            user: state.user ? { ...state.user, ...userUpdate } : null
        }));
    },

    //Función para limpiar el usuario
    clearUser: () => {
        set(() => ({
            user: null
        }));
    }
}),
    {
        name: 'userAuthenticated'
    }
)))

