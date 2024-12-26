import type { Request, Response } from "express";
import Cart from "../models/Cart";
import CartDetails from "../models/CartDetails";
import Product from "../models/Product";
import Inventory from "../models/Inventory";

class CartController {

    public static addToCart = async (request: Request, response: Response) => {

        try {

            const { productId } = request.body;
            let cart: Cart;

            //comprobar si el usuario ya tiene un carrito
            cart = await Cart.findOne({
                where: { userId: request.user.userId }
            })

            if (!cart) {
                cart = new Cart({ userId: request.user.userId });
                await cart.save();
            }

            //Verificar si el producto ya existe en el carrito
            const cartDetailsExist = await CartDetails.findOne({
                where: { cartId: cart.cartId, productId }
            })

            if (cartDetailsExist) {
                return response.status(409).json({ error: 'Este producto ya existe en el carrito' });
            }

            //Verificar si el producto existe
            const product = await Product.findByPk(productId, {
                include:
                {
                    model: Inventory,
                    attributes: ['quantity', 'last_updated']
                },

            });

            if (!product) {
                const error = new Error('Producto no encontrado');
                return response.status(404).json({ error: error.message });
            }

            const inventory = await Inventory.findByPk(productId);

            if (inventory.quantity === 0) {
                const error = new Error('No hay mas producto en stock');
                return response.status(409).json({ error: error.message });
            }

            //Agregar al modelo de carrito details
            const cartDetails = new CartDetails({
                cartId: cart.cartId,
                productId,
                unit_price: product.price,
                
            })

            cartDetails.subtotal = product.price * cartDetails.quantity;
            inventory.quantity -= 1;

            await inventory.save();
            await cartDetails.save();

            response.status(200).send('Producto agregado al carrito')
        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong')
            return response.status(500).json({ error: err.message })

        }

    }

    public static getCarts = async (request: Request, response: Response) => {
        try {

            const carts = await Cart.findAll({
                where: {
                    userId: request.user.userId
                },
                include: [
                    {
                        model: Product,
                        through: {
                        }
                    },
                ],
            })
            response.status(200).json(carts);
        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

    public static deleteCartItem = async (request: Request, response: Response) => {
        try {
            const { cartId, productId } = request.params;

            const cartDetails = await CartDetails.findOne({
                where: { cartId, productId }
            });

            if (!cartDetails) {
                const error = new Error('El producto no existe en el carrito');
                return response.status(404).json({ error: error.message });
            }

            const inventory = await Inventory.findByPk(productId);

            inventory.quantity = inventory.quantity + cartDetails.quantity;

            await inventory.save();
            await cartDetails.destroy();
            response.status(200).send('Producto eliminado del carrito');

        } catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    }

    public static incrementProductQuantity = async (request: Request, response: Response) => {
        try {
            const { cartId, productId } = request.params;

            const cartDetails = await CartDetails.findOne({
                where: { cartId, productId }
            });

            if (!cartDetails) {
                const error = new Error('El producto no existe en el carrito');
                return response.status(404).json({ error: error.message });
            }

            const product = await Product.findByPk(productId, {
                include: {
                    model: Inventory,
                    attributes: ['quantity']
                },
                raw: true
            });

            if (!product) {
                const error = new Error('Producto no encontrado');
                return response.status(404).json({ error: error.message });
            }

            const inventory = await Inventory.findByPk(productId);

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
        } catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

    public static decrementProductQuantity = async (request: Request, response: Response) => {
        try {
            const { cartId, productId } = request.params;

            const cartDetails = await CartDetails.findOne({
                where: { cartId, productId }
            });

            const inventory = await Inventory.findByPk(productId)

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
        } catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }

    }

}

export default CartController;