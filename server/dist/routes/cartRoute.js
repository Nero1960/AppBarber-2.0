"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const Validation_1 = require("../middleware/Validation");
const cartController_1 = __importDefault(require("../controllers/cartController"));
const route = (0, express_1.Router)();
route.use(auth_1.authenticate);
route.post('/add-to-cart', [
    (0, express_validator_1.body)('productId').notEmpty().withMessage('Product ID is required'),
], Validation_1.handleInputErrors, cartController_1.default.addToCart);
route.get('/get-carts', cartController_1.default.getCarts);
route.delete('/delete-product-cart/:cartId/product/:productId', (0, express_validator_1.param)('cartId')
    .isNumeric().withMessage('ID del carrito no valido'), (0, express_validator_1.param)('productId')
    .isNumeric().withMessage('ID del producto no valido'), Validation_1.handleInputErrors, cartController_1.default.deleteCartItem);
route.patch('/increment-product/:cartId/product/:productId', (0, express_validator_1.param)('cartId')
    .isNumeric().withMessage('ID del carrito no valido'), (0, express_validator_1.param)('productId')
    .isNumeric().withMessage('ID del producto no valido'), Validation_1.handleInputErrors, cartController_1.default.incrementProductQuantity);
route.patch('/decrement-product/:cartId/product/:productId', (0, express_validator_1.param)('cartId')
    .isNumeric().withMessage('ID del carrito no valido'), (0, express_validator_1.param)('productId')
    .isNumeric().withMessage('ID del producto no valido'), Validation_1.handleInputErrors, cartController_1.default.decrementProductQuantity);
exports.default = route;
//# sourceMappingURL=cartRoute.js.map