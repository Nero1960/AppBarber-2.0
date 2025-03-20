import User from "../../models/User";
import { UserType } from "../../types";

export interface IAuthService {
    getUserByEmail(email : User['email']) : Promise<User | null>,
    createAccount(data : UserType) : Promise<void>,
    getUserById(id : User['userId']) : Promise<User>,
    confirmAccount(token : string) : Promise<void>,
    login(email: User['email'], password: User['password']) : Promise<string>,
    requestConfirmationToken(email: User['email']) : Promise<void>,
    forgotPassword(email: User['email']) : Promise<void>,
    validateToken(token: string) : Promise<void>,
    updatePasswordWithToken(token: string, password: User['password']) : Promise<void>,
}