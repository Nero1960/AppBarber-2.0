import Token from "../../models/Token";
import User from "../../models/User";

export interface ITokenService {
    createToken(userId: User['userId']): Promise<Token>;
    getTokenByToken(token: Token['token']): Promise<Token | null>;
    deleteToken(token: Token): Promise<void>;
}