import { ConfirmToken } from "@/types/index"
import { Label } from "@/components/ui/label"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { validateToken } from "@/api/AuthApi"
import { toast } from "sonner"
import Spinner from "@/components/Spinner"
import Logo from "../Logo"


type NewPasswordTokenProps = {
    token: ConfirmToken['token'],
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>

}

const NewPasswordToken = ({ token, setToken, setIsValidToken }: NewPasswordTokenProps) => {

    const handleChangeToken = (token: ConfirmToken['token']) => {
        setToken(token);
    }

    const { mutate, isPending } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data);
            setIsValidToken(true);
        }
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
                        <h1 className="text-2xl font-bold text-center text-white-500">Recupera tu cuenta</h1>
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
                                <PinInputField className="w-10 h-10 p-3  rounded-lg text-white-500 border-gray-300 border placeholder-brown-200" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg text-white-500 border-gray-300 border placeholder-white" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg text-white-500 border-gray-300 border placeholder-white" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg text-white-500 border-gray-300 border placeholder-white" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg text-white-500 border-gray-300 border placeholder-white" />
                                <PinInputField className="w-10 h-10 p-3  rounded-lg text-white-500 border-gray-300 border placeholder-white-500" />

                            </PinInput>

                        </div>
                    </form>

                    {isPending && (
                        <div className='flex items-center justify-center my-3'>
                            <Spinner />
                        </div>
                    )}


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

export default NewPasswordToken