import { Link } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { AuthForgotPassword } from '@/types/index'
import MessageError from '@/components/MessageError'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/api/AuthApi'
import { toast } from 'sonner'
import Spinner from '@/components/Spinner'
import Logo from '@/components/Logo'

const ForgotPasswordView = () => {

    const initialValue: AuthForgotPassword = {
        email: ''
    }


    const { register, formState: { errors }, handleSubmit } = useForm<AuthForgotPassword>({ defaultValues: initialValue })

    const { mutate, isPending } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data);
        },

    })

    const handleForgotPassword = (formData: AuthForgotPassword) => mutate(formData)

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

                <div className="flex flex-col justify-center items-center h-[80vh] lg:h-[88vh]">
                    <div className="mb-5 space-y-1">
                        <h1 className="text-2xl font-bold text-center text-white-500">Recupera tu contraseña </h1>
                        <p className=" text-brown-200 text-md max-w-[500px] text-center">No pierdas el acceso a tu cuenta, recupera tu contraseña, enviaremos instrucciones a tu correo</p>
                    </div>


                    <form
                        noValidate
                        className="max-w-[38rem] mx-auto"
                        onSubmit={handleSubmit(handleForgotPassword)}
                    >

                        <div className="mb-3">
                            <Label
                                htmlFor="email"
                                className="text-brown-200"
                            >
                                Tu E-mail
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                className="bg-transparent border-white-900 text-white-500 placeholder:text-brown-200"
                                placeholder="Ingresa tu correo electrónico"
                                {...register('email', {
                                    required: 'Tu Correo es requerido',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Ingresa un correo válido'
                                    }
                                })}
                            />

                            {errors.email && <MessageError>{errors.email.message}</MessageError>}

                        </div>



                        <Link to={'/'} className="text-brown-200 text-sm uppercase text-center login-with grid grid-cols-3 gap-x-3 mb-5">Iniciar Sesión</Link>

                        {isPending && (
                            <div className='flex items-center justify-center my-3'>
                                <Spinner />
                            </div>
                        )}


                        <Input
                            type="submit"
                            value={`${isPending ? 'Enviando instrucciones' : 'Enviar Instrucciones'}`}
                            className="hover:bg-white-500 duration-300 cursor-pointer mb-5 mt-2"
                        />


                    </form>

                </div>

            </div>

        </>
    )
}

export default ForgotPasswordView