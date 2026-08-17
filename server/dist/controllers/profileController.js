"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("../helpers/auth");
class ProfileController {
    static updateProfile = async (request, response) => {
        try {
            const userId = request.params.userId;
            const { name, phone, address, lastname } = request.body;
            const user = await User_1.default.findByPk(userId);
            if (!user) {
                const error = new Error('Usuario no encontrado');
                return response.status(404).json({ error: error.message });
            }
            user.name = name || user.name;
            user.phone = phone || user.phone;
            user.address = address || user.address;
            user.lastname = lastname || user.lastname;
            //Verificar si hay una imagen previa 
            const imageExist = user.image;
            if (request.file) {
                //si se subió la imagen almacenar en la base de datos
                user.image = request.file.filename;
                //Si hay una imagen anterior, eliminarla del directorio uploads y de la base de datos
                if (imageExist && imageExist !== 'default.png') {
                    const previousImageUrl = path_1.default.join(__dirname, '..', 'uploads', imageExist);
                    fs_1.default.unlinkSync(previousImageUrl);
                }
            }
            await user.save();
            response.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            const err = new Error("Oops! Something went wrong");
            return response.status(500).json({ error: err.message });
        }
    };
    static updatePasswordProfile = async (request, response) => {
        try {
            const userId = request.params.userId;
            const password = request.body.password;
            const user = await User_1.default.findByPk(userId);
            user.password = await (0, auth_1.hashPassword)(password);
            user.save();
            response.status(200).send('Contraseña actualizada correctamente');
        }
        catch (error) {
            response.status(500).json({ error: 'Hubo un error' });
        }
    };
}
exports.default = ProfileController;
//# sourceMappingURL=profileController.js.map