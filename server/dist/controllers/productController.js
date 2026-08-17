"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
const Inventory_1 = __importDefault(require("../models/Inventory"));
class ProductController {
    static newProduct = async (request, response) => {
        try {
            const { name, price, description } = request.body;
            const product = await Product_1.default.findOne({
                where: { name }
            });
            if (product) {
                const error = new Error('Este producto ya existe');
                return response.status(409).json({ error: error.message });
            }
            const newProduct = await Product_1.default.create({
                name,
                price: +price,
                description,
                image: request.file ? request.file.filename : 'default.png'
            });
            await newProduct.save();
            const inventory = await Inventory_1.default.create({
                productId: newProduct.productId,
                quantity: request.body.quantity,
                last_updated: new Date()
            });
            console.log(newProduct);
            await inventory.save();
            response.status(201).send('Nuevo producto agregado al inventario');
        }
        catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(404).json({ error: err.message });
        }
    };
    static getProducts = async (request, response) => {
        try {
            const products = await Product_1.default.findAll({
                include: [
                    {
                        model: Inventory_1.default,
                        attributes: ['quantity', 'last_updated']
                    }
                ]
            });
            const formattedProducts = products.map(product => ({
                ...product.get(),
                price: Number(product.price.toString()) // Garantiza que `price` es un número
            }));
            response.status(200).json(products);
        }
        catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(404).json({ error: err.message });
        }
    };
    static getProductById = async (request, response) => {
        try {
            const productId = request.params.productId;
            const product = await Product_1.default.findByPk(productId, {
                include: [
                    {
                        model: Inventory_1.default,
                        as: 'inventory',
                        attributes: ['quantity', 'last_updated']
                    }
                ],
            });
            if (!product) {
                const error = new Error('Producto no encontrado');
                return response.status(404).json({ error: error.message });
            }
            product.price = Number(product.price);
            response.status(200).json(product);
        }
        catch (error) {
            const err = new Error('Oops! Something went wrong');
            return response.status(404).json({ error: err.message });
        }
    };
}
exports.default = ProductController;
//# sourceMappingURL=productController.js.map