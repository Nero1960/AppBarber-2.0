import { ConfirmToken } from "@/types/index"
import { Label } from "@/components/ui/label"
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { confirmAccount } from "@/api/AuthApi"
import { toast } from "sonner"
import Logo from "@/components/Logo"

const ConfirmAccountView = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState<ConfirmToken['token']>();

    const handleChangeToken = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess(data) {
            toast.success(data)
            navigate('/');
        },

    })

    const handleInputComplete = (token: ConfirmToken['token']) => mutate({ token })

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
                        <h1 className="text-2xl font-bold text-center text-white-500">Confirmar Cuenta </h1>
                        <p className=" text-brown-200 text-md text-center">Ingresa el código que recibiste por email </p>
                    </div>


                    <form noValidate className="max-w-96 mx-auto">
                        <div className="mb-3">
                            <Label
                                className="text-brown-200 text-center"
                            >
                                Código de 6 dígitos
                            </Label>
                        </div>

                        <div className="flex justify-center gap-5 flex-wrap">
                            <PinInput
                                value={token}
                                onChange={handleChangeToken}
                                onComplete={handleInputComplete}
                                

                            >
                                <PinInputField className="w-10 h-10 p-3  rounded-lg  border border-brown-200  placeholder-white-500 text-white-500" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg  border border-brown-200  placeholder-white-500 text-white-500" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg  border border-brown-200  placeholder-white-500 text-white-500" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg  border border-brown-200  placeholder-white-500 text-white-500" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg  border border-brown-200  placeholder-white-500 text-white-500" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg  border border-brown-200  placeholder-white-500 text-white-500" />

                            </PinInput>

                        </div>
                    </form>

                    <nav className="mt-10 flex flex-col space-y-4">
                        <Link
                            to='/request-token'
                            className="text-center bg-transparent hover:bg-brown-500 text-white-500 py-2 px-5 rounded-md  duration-300"
                        >
                            Solicitar un nuevo Código
                        </Link>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default ConfirmAccountView