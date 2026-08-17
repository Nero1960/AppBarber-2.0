"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const uploadFiles_1 = __importDefault(require("../middleware/uploadFiles"));
const Validation_1 = require("../middleware/Validation");
const productController_1 = __importDefault(require("../controllers/productController"));
const admin_1 = require("../middleware/admin");
const route = (0, express_1.Router)();
route.use(auth_1.authenticate);
route.post('/new-product', admin_1.isAdmin, uploadFiles_1.default.single('image'), // Manejo de la carga de la imagen antes de las validaciones
(0, express_validator_1.body)('name')
    .notEmpty().withMessage("El nombre del producto es requerido"), (0, express_validator_1.body)('price')
    .notEmpty().withMessage("El precio del producto es obligatorio "), (0, express_validator_1.body)('price')
    .isNumeric().withMessage("El precio debe ser un numero"), (0, express_validator_1.body)('description')
    .notEmpty().withMessage("La descripción del producto es requerido"), (0, express_validator_1.body)('quantity')
    .notEmpty().withMessage("La cantidad de producto es requerido"), Validation_1.handleInputErrors, productController_1.default.newProduct // Controlador que maneja la lógica de añadir un producto
);
route.get('/get-products', auth_1.authenticate, productController_1.default.getProducts // Controlador que maneja la lógica de obtener todos los productos
);
route.get('/get-product/:productId', (0, express_validator_1.param)('productId')
    .isNumeric().withMessage('ID de producto no válido')
    .notEmpty().withMessage('El product ID no debe ir vacío'), Validation_1.handleInputErrors, productController_1.default.getProductById // Controlador que maneja la lógica de obtener un producto por ID
);
exports.default = route;
//# sourceMappingURL=productRoute.js.map