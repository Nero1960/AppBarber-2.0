import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Testimonials } from "../types";

type TestimonialStore = {
    testimonials: Testimonials,
    setTestimonials: (testimonials: Testimonials) => void,

};


export const useTestimonialStore = create<TestimonialStore>()
    (devtools
        (persist
            ((set) => ({
                //Estado inicial de los Testimoniales
                testimonials: [],

                //Función para almacenar los Testimoniales
                setTestimonials: (testimonials) => {
                    set(() => ({
                        testimonials
                    }));
                },
            }),
                {
                    name: 'services'
                }
            )
        )
    )