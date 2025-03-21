import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { AuthLogin } from "@/types/index";
import MessageError from "@/components/MessageError";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthApi";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import Logo from "@/components/Logo";
import { useAuthStore } from "../../store/authStore"
import { useAuth } from "@/hooks/useAuth";


const LoginView = () => {

    const { refetch: refetchUser } = useAuth();

    const setUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();

    const initialValues: AuthLogin = {
        email: '',
        password: ''
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm<AuthLogin>({ defaultValues: initialValues });


    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: async () => {

            const { data } = await refetchUser();

            if (data) {
                setUser(data)
                reset();

                if (data.admin) {
                    navigate('/admin')
                } else {
                    navigate('/app')
                }
            }

        }
    })

    const handleSubmitLogin = (formData: AuthLogin) => mutate(formData)

    return (
        <>
            <div className="pt-5 px-7">
                <div className="flex items-center justify-between lg:justify-end">
                    <div className="flex lg:hidden">
                        <Logo />
                    </div>

                    <Link
                        to={'/register'}
                        className="px-4 py-2 duration-300 rounded-md text-white-500 hover:bg-brown-500"

                    >Regístrate</Link>
                </div>

                <div className="flex flex-col justify-center items-center  lg:h-[90vh]">
                    <div className="mb-5 space-y-1">
                        <h1 className="text-2xl font-bold text-center text-white-500">Iniciar Sesión </h1>
                        <p className="text-center text-brown-200 text-md">Ingresa tus credenciales para iniciar sesión </p>
                    </div>


                    <form
                        noValidate
                        className="mx-auto max-w-96"
                        onSubmit={handleSubmit(handleSubmitLogin)}

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

                        <div className="mb-5">
                            <Label
                                htmlFor="password"
                                className="text-brown-200"

                            >
                                Contraseña
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                className="bg-transparent border-white-900 text-white-500 focus:border-none placeholder:text-brown-200"
                                placeholder="Ingresa tu contraseña"
                                {...register('password', {
                                    required: 'Tu Contraseña es requerida',

                                })}
                            />

                            {errors.password && <MessageError>{errors.password.message}</MessageError>}

                        </div>

                        <Link to={'/forgot-password'} className="grid grid-cols-3 mb-5 text-sm text-center uppercase text-brown-200 login-with">¿Olvidaste tu contraseña?</Link>

                        {isPending && (
                            <div className='flex items-center justify-center my-3'>
                                <Spinner />
                            </div>
                        )}

                        <Input
                            type="submit"
                            value={`${isPending ? 'Iniciando Sesión' : 'Iniciar Sesión'}`}
                            className="mb-5 duration-300 border-none cursor-pointer bg-Primary-500 hover:bg-Primary-600 text-white-500"
                        />

                        <p className="grid grid-cols-3 mb-5 text-sm text-center uppercase text-brown-200 login-with gap-x-3">Continuar Con</p>

                        <button
                            className="flex items-center justify-center w-full py-2 text-center duration-300 rounded-md border-white-900 gap-x-2 text-white-500 bg-brown-500"
                        >
                            <FcGoogle />
                            Google
                        </button>

                        <p className="max-w-4xl mt-3 text-sm text-center text-brown-200">Al crear una cuenta, aceptas nuestros Términos y Condiciones y la Política de Privacidad</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginView