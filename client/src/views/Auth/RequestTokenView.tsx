import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { AuthRequestToken } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestConfirmationToken } from "@/api/AuthApi"
import MessageError from "@/components/MessageError"
import Spinner from "@/components/Spinner"
import Logo from "@/components/Logo"

const RequestTokenView = () => {

    const initialValue: AuthRequestToken = {
        email: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm<AuthRequestToken>({
        defaultValues: initialValue
    });

    const { mutate, isPending } = useMutation({
        mutationFn: requestConfirmationToken,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handleSubmitRequestToken = (formData: AuthRequestToken) => mutate(formData)

    return (
        <>
            <div className="pt-5 px-7">
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
                        <h1 className="text-2xl font-bold text-center text-white-500">Solicitar Nuevo Código de verificación </h1>
                        <p className=" text-brown-200 text-md text-center">Ingresa tu email, y te enviaremos un nuevo código </p>
                    </div>


                    <form
                        noValidate
                        className="max-w-96 mx-auto"
                        onSubmit={handleSubmit(handleSubmitRequestToken)}
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
                                    required: 'Tu E-mail es obligatorio',
                                    pattern: {
                                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                        message: 'Ingresa un email válido'
                                    }
                                })}
                            />

                            {errors.email && <MessageError>{errors.email.message}</MessageError>}

                        </div>

                        <Link to={'/forgot-password'} className="text-brown-200 text-sm uppercase text-center login-with grid grid-cols-3 mb-5">¿Olvidaste tu contraseña?</Link>

                        {isPending && (
                            <div className='flex items-center justify-center my-3'>
                                <Spinner />
                            </div>
                        )}

                        <Input
                            type="submit"
                            value={'Solicitar código'}
                            className="hover:bg-white-500 duration-300 cursor-pointer mb-5"
                        />
                    </form>
                </div>
            </div>
        </>

    )
}

export default RequestTokenView