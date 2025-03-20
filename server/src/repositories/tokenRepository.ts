import { ITokenRepository } from "../interfaces/repositories/ITokenRepository";
import Token from "../models/Token";

class TokenRepository implements ITokenRepository {

    //Guardar token en la base de datos
    public async save(token: Token) {
        return await token.save();
    }

    //Buscar token por token
    public async findByToken(token: Token['token']) {
        return await Token.findOne({
            where: { token }
        })
    }
    //Eliminar token
    public async destroyToken(token: Token) {
        return await token.destroy();
    }
}

export default TokenRepository;