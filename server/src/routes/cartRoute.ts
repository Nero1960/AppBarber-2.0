import {body, param} from 'express-validator'
import { Router } from 'express'
import { authenticate } from '../middleware/auth';
import { handleInputErrors } from '../middleware/Validation';
import CartController from '../controllers/cartController';

const route = Router();

route.use(authenticate);

route.post(
    '/add-to-cart',
    [
        body('productId').notEmpty().withMessage('Product ID is required'),
    ],
    handleInputErrors,
    CartController.addToCart   
)

route.get(
    '/get-carts',
    CartController.getCarts
)

route.delete(
    '/delete-product-cart/:cartId/product/:productId',
    param('cartId')
        .isNumeric().withMessage('ID del carrito no valido'),
    param('productId')
        .isNumeric().withMessage('ID del producto no valido'),
    handleInputErrors,
    CartController.deleteCartItem
)

route.patch(
    '/increment-product/:cartId/product/:productId',
    param('cartId')
        .isNumeric().withMessage('ID del carrito no valido'),
    param('productId')
    .isNumeric().withMessage('ID del producto no valido'),
    handleInputErrors,
    CartController.incrementProductQuantity
)

route.patch(
    '/decrement-product/:cartId/product/:productId',
    param('cartId')
        .isNumeric().withMessage('ID del carrito no valido'),
    param('productId')
    .isNumeric().withMessage('ID del producto no valido'),
    handleInputErrors,
    CartController.decrementProductQuantity
)

export default route;