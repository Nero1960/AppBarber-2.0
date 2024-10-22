import { AuthResetPassword, ConfirmToken } from "@/types/index"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "@/api/AuthApi"
import { toast } from "sonner"
import MessageError from "@/components/MessageError"
import Spinner from "@/components/Spinner"
import Logo from "../Logo"

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

const NewPasswordForm = ({ token }: NewPasswordFormProps) => {

    const initialValues: AuthResetPassword = {
        password: '',
        password_confirmation: ''
    }

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<AuthResetPassword>({
        defaultValues: initialValues
    });

    const { mutate, isPending } = useMutation({
        mutationFn: resetPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            reset();
            navigate('/')
        },
    })

    const handleSubmitResetPassword = (formData: AuthResetPassword) => {
        const data = {
            token,
            formData
        }

        mutate(data);
    }


    return (
        <>
            <div className=" py-5 px-7">
                <div className="flex justify-between items-center lg:justify-end">
                    <div className="flex lg:hidden">
                        <Logo />
                    </div>
                    <Link
                        to={'/register'}
                        className="text-white-500  hover:bg-brown-500 py-2 rounded-md px-4 duration-300"

                    >Regístrate</Link>
                </div>

                <div className="flex flex-col justify-center items-center h-[80vh] lg:h-[90vh]">
                    <div className="mb-5 space-y-1">
                        <h1 className="text-2xl font-bold text-center text-white-500">Restablece Tu Contraseña </h1>
                        <p className=" text-brown-200 text-md max-w-[500px] text-center">Establece una nueva contraseña y no pierdas tu cuenta en Mojica's Barbershop</p>
                    </div>


                    <form
                        noValidate
                        onSubmit={handleSubmit(handleSubmitResetPassword)}
                        className="max-w-[38rem] mx-auto"
                    >

                        <div className="mb-3">
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


                        <div className="mb-3">
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



                        <Link to={'/'} className="text-brown-200 text-sm uppercase text-center login-with grid grid-cols-3 mb-5">Iniciar Sesión</Link>

                        {isPending && (
                            <div className='flex items-center justify-center my-3'>
                                <Spinner />
                            </div>
                        )}


                        <Input
                            type="submit"
                            value={`${isPending ? 'Restableciendo Contraseña' : 'Restablecer Contraseña'}`}
                            className="hover:bg-white-500 duration-300 cursor-pointer mb-5 mt-2"
                        />


                    </form>

                </div>

            </div>
        </>
    )
}

export default NewPasswordForm