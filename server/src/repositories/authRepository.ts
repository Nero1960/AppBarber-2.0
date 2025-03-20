import { IAuthRepository } from "../interfaces/repositories/IAuthRepository";
import User from "../models/User";


class AuthRepository implements IAuthRepository {

    //Buscar a un usuario por su email
    public async findByEmail(email: User['email']) {
        return await User.findOne({
            where: {email}
        })
    }
    //Buscar a un usuario por su id
    public async findById(id: User['userId']) {
        return await User.findByPk(id)
    }
    //guardar un usuario
    public async save(user: User) {
        return await user.save();
    }

}

export default AuthRepository;