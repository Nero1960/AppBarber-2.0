import User from "../../models/User";

export interface IAuthRepository {
    findByEmail(email: User['email']): Promise<User> | null;
    findById(id: User['userId']): Promise<User | null>;
    save(user: User): Promise<User>;
}