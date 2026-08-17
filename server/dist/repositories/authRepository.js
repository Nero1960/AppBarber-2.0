"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class AuthRepository {
    //Buscar a un usuario por su email
    async findByEmail(email) {
        return await User_1.default.findOne({
            where: { email }
        });
    }
    //Buscar a un usuario por su id
    async findById(id) {
        return await User_1.default.findByPk(id);
    }
    //guardar un usuario
    async save(user) {
        return await user.save();
    }
}
exports.default = AuthRepository;
//# sourceMappingURL=authRepository.js.map