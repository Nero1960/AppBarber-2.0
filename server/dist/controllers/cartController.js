"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_1 = __importDefault(require("../models/Cart"));
const CartDetails_1 = __importDefault(require("../models/CartDetails"));
const Product_1 = __importDefault(require("../models/Product"));
const Inventory_1 = __importDefault(require("../models/Inventory"));
class CartController {
    static addToCart = async (request, response) => {
        try {
            const { productId } = request.body;
            let cart;
            //comprobar si el usuario ya tiene un carrito
            cart = await Cart_1.default.findOne({
                where: { userId: request.user.userId }
            });
            if (!cart) {
                cart = new Cart_1.default({ userId: request.user.userId });
                await cart.save();
            }
            //Verificar si el producto ya existe en el carrito
            const cartDetailsExist = await CartDetails_1.default.findOne({
                where: { cartId: cart.cartId, productId }
            });
            if (cartDetailsExist) {
                return response.status(409).json({ error: 'Este producto ya existe en el carrito' });
            }
            //Verificar si el producto existe
            const product = await Product_1.default.findByPk(productId, {
                include: {
                    model: Inventory_1.default,
                    attributes: ['quantity', 'last_updated']
                },
            });
            if (!product) {
                const error = new Error('Producto no encontrado');
                return response.status(404).json({ error: error.message });
            }
            const inventory = await Inventory_1.default.findByPk(productId);
            if (inventory.quantity === 0) {
                const error = new Error('No hay mas producto en stock');
                return response.status(409).json({ error: error.message });
            }
            //Agregar al modelo de carrito details
            const cartDetails = new CartDetails_1.default({
                cartId: cart.cartId,
                productId,
                unit_price: product.price,
            });
            cartDetails.subtotal = product.price * cartDetails.quantity;
            inventory.quantity -= 1;
            await inventory.save();
            await cartDetails.save();
            response.status(200).send('Producto agregado al carrito');
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static getCarts = async (request, response) => {
        try {
            const carts = await Cart_1.default.findAll({
                where: {
                    userId: request.user.userId
                },
                include: [
                    {
                        model: Product_1.default,
                        through: {}
                    },
                ],
            });
            response.status(200).json(carts);
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static deleteCartItem = async (request, response) => {
        try {
            const { cartId, productId } = request.params;
            const cartDetails = await CartDetails_1.default.findOne({
                where: { cartId, productId }
            });
            if (!cartDetails) {
                const error = new Error('El producto no existe en el carrito');
                return response.status(404).json({ error: error.message });
            }
            const inventory = await Inventory_1.default.findByPk(productId);
            inventory.quantity = inventory.quantity + cartDetails.quantity;
            await inventory.save();
            await cartDetails.destroy();
            response.status(200).send('Producto eliminado del carrito');
        }
        catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static incrementProductQuantity = async (request, response) => {
        try {
            const { cartId, productId } = request.params;
            const cartDetails = await CartDetails_1.default.findOne({
                where: { cartId, productId }
            });
            if (!cartDetails) {
                const error = new Error('El producto no existe en el carrito');
                return response.status(404).json({ error: error.message });
            }
            const product = await Product_1.default.findByPk(productId, {
                include: {
                    model: Inventory_1.default,
                    attributes: ['quantity']
                },
                raw: true
            });
            if (!product) {
                const error = new Error('Producto no encontrado');
                return response.status(404).json({ error: error.message });
            }
            const inventory = await Inventory_1.default.findByPk(productId);
            if (inventory.quantity <= cartDetails.quantity) {
                const error = new Error('No hay mas producto en stock');
                return response.status(409).json({ error: error.message });
            }
            cartDetails.quantity++;
            cartDetails.subtotal = Number(cartDetails.unit_price * cartDetails.quantity);
            inventory.quantity -= 1;
            await inventory.save();
            await cartDetails.save();
            response.status(200).send('Cantidad del producto incrementada');
        }
        catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static decrementProductQuantity = async (request, response) => {
        try {
            const { cartId, productId } = request.params;
            const cartDetails = await CartDetails_1.default.findOne({
                where: { cartId, productId }
            });
            const inventory = await Inventory_1.default.findByPk(productId);
            if (!cartDetails) {
                const error = new Error('El producto no existe en el carrito');
                return response.status(404).json({ error: error.message });
            }
            if (!(cartDetails.quantity > 1)) {
                const error = new Error('El producto no puede ser disminuido más');
                return response.status(409).json({ error: error.message });
            }
            cartDetails.quantity--;
            cartDetails.subtotal = Number(cartDetails.unit_price * cartDetails.quantity);
            inventory.quantity += 1;
            await inventory.save();
            await cartDetails.save();
            response.status(200).send('Cantidad del producto disminuida');
        }
        catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
}
exports.default = CartController;
//# sourceMappingURL=cartController.js.map