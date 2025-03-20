import AppError from "../errors/AppError";
import { generateToken } from "../helpers/token";
import { ITokenRepository } from "../interfaces/repositories/ITokenRepository";
import { ITokenService } from "../interfaces/services/ITokenService";
import Token from "../models/Token";
import User from "../models/User";

class TokenService implements ITokenService {

    constructor(private tokenRepository: ITokenRepository) { }

    public async createToken(userId: User['userId']) {
        //crear un instancia de token
        const token = new Token();
        //Generar un token de 6 dígitos
        token.token = generateToken();
        //Asignar el id del usuario
        token.userId = userId;
        //Guardar el token en la base de datos
        return await this.tokenRepository.save(token);
    }

    public async getTokenByToken(token: Token["token"]) {
        //Buscar el token en la base de datos
        const tokenExist = await this.tokenRepository.findByToken(token)
        //Validar si el token existe
        if (!tokenExist) {
            throw new AppError('Token no encontrado', 400);
        }
        //Retornar el token
        return tokenExist;
    }

    public async deleteToken(token: Token) {
        //Eliminar el token de la base de datos
        await this.tokenRepository.destroyToken(token);
    }
}

export default TokenService;