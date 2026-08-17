"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const colors_1 = __importDefault(require("colors"));
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = require("./middleware/errorHandler");
//Instancia de express
const server = (0, express_1.default)();
//variables de entorno
dotenv_1.default.config();
//uso de cors para permitir peticiones desde cualquier dominio
server.use((0, cors_1.default)());
//leer datos del formulario
server.use(express_1.default.json());
// Middleware para procesar datos de formularios (si aplicable)
server.use(express_1.default.urlencoded({ extended: true }));
//comprobar la conexión a la base de datos
const connectDB = async () => {
    try {
        await database_1.default.authenticate();
        console.log(colors_1.default.bgGreen.white('Database connection has been established successfully.'));
    }
    catch (error) {
        console.log(colors_1.default.bgRed.white('Unable to connect to the database:'), error);
    }
};
connectDB();
server.use((0, morgan_1.default)('dev'));
//hacer uso de los router, revisar archivo index del route.ts
server.use('/api', routes_1.default);
//Manejo de errores
server.use(errorHandler_1.errorHandler);
server.use('/uploads', express_1.default.static('src/uploads'));
exports.default = server;
//# sourceMappingURL=server.js.map