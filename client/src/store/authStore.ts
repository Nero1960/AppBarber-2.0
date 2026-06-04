import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User, UserUpdate } from '@/types/index';

type AuthUserState = {
    user: User | null;
    isLoading: boolean;  // ← NUEVO: estado de carga
    setUser: (user: User) => void;
    updateUser: (userUpdate: UserUpdate) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthUserState>()(devtools(persist((set) => ({
    //Estado inicial del usuario
    user: null,
    isLoading: true,  // ← NUEVO: comienza en true mientras carga

    //Función para almacenar el usuario
    setUser: (user) => {
        set(() => ({
            user: user,
            isLoading: false  // ← NUEVO: ya no está cargando
        }));
    },

    // Función para actualizar al usuario
    updateUser: (userUpdate: UserUpdate) => {
        set((state) => ({
            user: state.user ? { ...state.user, ...userUpdate } : null,
            // isLoading no cambia aquí
        }));
    },

    //Función para limpiar el usuario
    clearUser: () => {
        set(() => ({
            user: null,
            isLoading: false  // ← NUEVO: ya no está cargando
        }));
    }
}),
    {
        name: 'userAuthenticated',
        // ← NUEVO: esto se ejecuta cuando termina de leer localStorage
        onRehydrateStorage: () => (state) => {
            if (state) {
                state.isLoading = false;
            }
        }
    }
)));