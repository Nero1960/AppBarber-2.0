import { AuthResetPassword } from "@/types/index";
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MessageError from "@/components/MessageError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@chakra-ui/react";
import { changePasswordProfile } from "@/api/ProfileApi";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";


const ChangePasswordView = () => {

    //llamado al usuario autenticado
    const user = useAuthStore(state => state.user);

    const params = useParams();
    const userId = parseInt(params.userId!)

    const navigate = useNavigate();

    //comprobar si el userId es el mismo que el usuario autenticado
    useEffect(() => {
        if (userId !== user?.userId) {
            navigate(`/404`)
        }
    }, [])


    const initialValues: AuthResetPassword = {
        password: '',
        password_confirmation: ''
    }


    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<AuthResetPassword>({
        defaultValues: initialValues
    });

    const { mutate, isPending } = useMutation({

        mutationFn: changePasswordProfile,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data);
            reset();
        },

    })

    const handleSubmitResetPassword = (formData: AuthResetPassword) => {
        const data = {
            userId,
            formData
        }
        mutate(data);
    }


    return (
        <>

            <main className="px-8 mg:px-0 max-w-4xl mx-auto mt-5 md:mt-20 h-[70vh] md:h-[80vh] animate-fade-up animation-delay-1000">

                <div className="bg-brown-500 max-w-4xl px-5 lg:px-20 mx-auto py-10">
                    <div className="mb-5 space-y-2">
                        <h1 className="text-2xl lg:text-3xl font-bold text-center text-white-500">Actualiza Tu Contraseña </h1>
                        <p className=" text-brown-200 text-md max-w-[500px mx-auto text-sm text-center">Establece una nueva contraseña</p>
                    </div>


                    <form
                        noValidate
                        onSubmit={handleSubmit(handleSubmitResetPassword)}
                        className=""
                    >

                        <div className="mb-5 lg:mb-3">
                            <Label
                                htmlFor="password"
                                className="text-brown-200"
                            >
                                Nueva Contraseña
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                className="bg-transparent border-white-900 text-white-500 placeholder:text-brown-200"
                                placeholder="Ingresa tu contraseña"
                                {...register('password', {
                                    required: 'Tu Contraseña es requerida',
                                    minLength: {
                                        value: 8,
                                        message: 'Tu Contraseña debe contener mínimo 8 caracteres'
                                    }
                                })}

                            />

                            {errors.password && (
                                <MessageError>{errors.password.message}</MessageError>
                            )}

                        </div>


                        <div className="mb-5 lg:mb-3">
                            <Label
                                htmlFor="password_confirmation"
                                className="text-brown-200"
                            >
                                Confirma tu contraseña
                            </Label>
                            <Input
                                type="password"
                                id="password_confirmation"
                                className="bg-transparent border-white-900 text-white-500 placeholder:text-brown-200"
                                placeholder="Repetir Contraseña"
                                {...register('password_confirmation', {
                                    required: 'Tu Contraseña es requerida',
                                    validate: (value) => value === getValues('password') || 'Las contraseñas no coinciden'
                                })}

                            />

                            {errors.password_confirmation && (
                                <MessageError>{errors.password_confirmation.message}</MessageError>
                            )}

                        </div>

                        {isPending && (
                            <div className='flex items-center justify-center my-3'>
                                <Spinner />
                            </div>
                        )}


                        <Input
                            type="submit"
                            className="bg-Primary-500 border-none text-white-500 text-sm hover:bg-Primary-600 cursor-pointer duration-300"
                            value={`${isPending ? 'Restableciendo Contraseña' : 'Restablecer Contraseña'}`}

                        />


                    </form>


                </div>

            </main>

        </>
    )
}

export default ChangePasswordView