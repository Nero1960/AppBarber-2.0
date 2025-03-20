import Token from "../../models/Token";

export interface ITokenRepository {
    save(token: Token): Promise<Token>;
    findByToken(token: Token['token']): Promise<Token> | null;
    destroyToken(token: Token): Promise<void>;
}