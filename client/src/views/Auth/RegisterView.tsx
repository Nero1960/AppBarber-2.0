import { Link } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { AuthRegister } from 'types'
import MessageError from '@/components/MessageError'
import { registerUser } from '@/api/AuthApi'
import Spinner from '@/components/Spinner'
import { toast } from 'sonner'
import Logo from '@/components/Logo'

const RegisterView = () => {

    const initialValues: AuthRegister = {
        name: '',
        email: '',
        password: '',
        lastname: '',
        phone: '',
        password_confirmation: '',

    }

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<AuthRegister>({
        defaultValues: initialValues
    });

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data)
            reset();
        }
    });

    const handleSubmitRegister = (formData: AuthRegister) => mutate(formData);


    return (
        <>

            <div className=" py-5 px-7 h-screen">
                <div className="flex justify-between items-center lg:justify-end">
                    <div className="flex lg:hidden">
                        <Logo />
                    </div>
                    <Link
                        to={'/'}
                        className="text-white-500  hover:bg-brown-500 py-2 rounded-md px-4 duration-300"

                    >Iniciar Sesión</Link>
                </div>

                <div className="flex flex-col justify-center items-center  lg:h-[90vh]">

                    <div className="mb-5 space-y-1 mt-5 lg:mt-0">
                        <h1 className="text-2xl font-bold text-center text-white-500">Crea una Cuenta </h1>
                        <p className=" text-brown-200 text-md text-center max-w-[400px]">Regístrate y descubre una experiencia de estilo personalizada. ¡Empieza hoy! </p>
                    </div>


                    <form noValidate onSubmit={handleSubmit(handleSubmitRegister)} className="max-w-[28rem] mx-auto">

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3'>

                            <div className="mb-3">
                                <Label
                                    htmlFor="name"
                                    className="text-brown-200"
                                >
                                    Nombre
                                </Label>
                                <Input
                                    type="name"
                                    id="name"
                                    className="bg-transparent border-white-900 text-white-500 placeholder:text-brown-200"
                                    placeholder="Tu Nombre"
                                    {...register('name', {
                                        required: 'Tu Nombre es obligatorio'
                                    })}
                                />
                                {errors.name && (
                                    <MessageError>{errors.name.message}</MessageError>
                                )}
                            </div>

                            <div className="mb-3">
                                <Label
                                    htmlFor="lastname"
                                    className="text-brown-200"
                                >
                                    Apellido
                                </Label>
                                <Input
                                    type="lastname"
                                    id="lastname"
                                    className="bg-transparent border-white-900 text-white-500 placeholder:text-brown-200"
                                    placeholder="Tu Apellido"
                                    {...register('lastname', {
                                        required: 'Tu Apellido es obligatorio'
                                    })}
                                />

                                {errors.lastname && (
                                    <MessageError>{errors.lastname.message}</MessageError>
                                )}
                            </div>

                        </div>

                        <div className='grid  grid-cols-1 lg:grid-cols-2 gap-x-3'>
                            <div className="mb-3">
                                <Label
                                    htmlFor="phone"
                                    className="text-brown-200"
                                >
                                    Teléfono
                                </Label>
                                <Input
                                    type="phone"
                                    id="phone"
                                    className="bg-transparent border-white-900 text-white-500 placeholder:text-brown-200"
                                    placeholder="Tu número telefónico"
                                    {...register('phone', {
                                        required: 'Ingresa un numero telefónico',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Por favor ingresa solo números'
                                        }
                                    })}
                                />

                                {errors.phone && (
                                    <MessageError>{errors.phone.message}</MessageError>
                                )}
                            </div>

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
                                    placeholder="Correo Electrónico"
                                    {...register('email', {
                                        required: 'Tu Correo es requerido'
                                    })}
                                />

                                {errors.email && (
                                    <MessageError>{errors.email.message}</MessageError>
                                )}
                            </div>
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

                        <div className="mb-5">
                            <Label
                                htmlFor="password_confirmation"
                                className="text-brown-200"

                            >
                                Repite tu contraseña
                            </Label>
                            <Input
                                type="password"
                                id="password_confirmation"
                                className="bg-transparent border-white-900 text-white-500 focus:border-none placeholder:text-brown-200"
                                placeholder=""
                                {...register('password_confirmation', {
                                    required: 'Tu Contraseña es requerida',
                                    validate: (value) => value === getValues('password') || 'Las contraseñas no coinciden'
                                })}
                            />

                            {errors.password_confirmation && (
                                <MessageError>{errors.password_confirmation.message}</MessageError>
                            )}
                        </div>

                        <Link to={'/forgot-password'} className="text-brown-200 text-sm uppercase text-center login-with grid grid-cols-3 mb-5">¿Olvidaste tu contraseña?</Link>

                        {isPending && (
                            <div className='flex items-center justify-center my-3'>
                                <Spinner />
                            </div>
                        )}

                        <Input
                            type="submit"
                            value={`${isPending ? 'Creando Cuenta' : 'Crear Cuenta'} `}
                            className="hover:bg-white-500 duration-300 cursor-pointer mb-5"
                        />


                    </form>

                </div>

            </div>


        </>
    )
}

export default RegisterView