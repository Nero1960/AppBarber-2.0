import type { Request, Response } from "express";
import Product from "../models/Product";
import Inventory from "../models/Inventory";

class ProductController {

    public static newProduct = async (request: Request, response: Response) => {
        try {

           const { name, price, description } = request.body;
            const product = await Product.findOne({
                where: { name }
            });

            if(product){
                const error = new Error('Este producto ya existe');
                return response.status(409).json({ error: error.message });
            }

            const newProduct = await Product.create({
                name,
                price: +price,
                description,
                image: request.file? request.file.filename : 'default.png'
            });

            await newProduct.save();


            const inventory = await Inventory.create({
                productId: newProduct.productId,
                quantity: request.body.quantity,
                last_updated: new Date()
            })
            console.log(newProduct)

            await inventory.save();
            response.status(201).send('Nuevo producto agregado al inventario');
            
        } catch (error) {
            const err = new Error('Oops! Something went wrong')
            return response.status(404).json({error: err.message})
        }

    }

    public static getProducts = async (request: Request, response: Response) => {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Inventory,
                        attributes: ['quantity', 'last_updated']
                    }
                ]
            });

            const formattedProducts = products.map(product => ({
                ...product.get(),
                price: Number(product.price.toString()) // Garantiza que `price` es un número
            }));

            response.status(200).json(products);
            
        } catch (error) {
            const err = new Error('Oops! Something went wrong')
            return response.status(404).json({error: err.message})
        }

    }

    public static getProductById = async (request: Request, response: Response) => {
        try {

            const productId = request.params.productId;
            
            const product = await Product.findByPk(productId, {
                include: [
                    {
                        model: Inventory,
                        as: 'inventory',
                        attributes: ['quantity', 'last_updated']
                    }
                ],
            });

            if(!product){
                const error = new Error('Producto no encontrado');
                return response.status(404).json({ error: error.message });
            }
            
            product.price = Number(product.price)

            response.status(200).json(product);
            
        } catch (error) {
            const err = new Error('Oops! Something went wrong')
            return response.status(404).json({error: err.message})
        }
    }
    
}


export default ProductController;