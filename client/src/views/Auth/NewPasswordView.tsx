import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { ConfirmToken } from "@/types/index";
import { useState } from "react"

const NewPasswordView = () => {

    const [token, setToken] = useState<ConfirmToken['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            {!isValidToken 
                ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>
                : <NewPasswordForm token={token}/>
            }
        </>

    )
}

export default NewPasswordView