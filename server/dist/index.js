"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const server_1 = __importDefault(require("./server"));
//Definir el puerto
const port = Number(process.env.PORT || 4000);
//Arrancar el servidor en el puerto establecido
server_1.default.listen(port, '0.0.0.0', () => {
    console.log(colors_1.default.white.bgGreen(`Servidor funcionando en el puerto ${port}`));
});
//# sourceMappingURL=index.js.map