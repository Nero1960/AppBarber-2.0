import { Router } from "express";
import { body, param } from "express-validator"
import { authenticate } from "../middleware/auth";
import upload from "../middleware/uploadFiles";
import { handleInputErrors } from "../middleware/Validation";
import ProductController from "../controllers/productController";
import { isAdmin } from "../middleware/admin";

const route = Router();

route.use(authenticate);

route.post(
    '/new-product',
    isAdmin,
    upload.single('image'), // Manejo de la carga de la imagen antes de las validaciones
    body('name')
        .notEmpty().withMessage("El nombre del producto es requerido"),
    body('price')
        .notEmpty().withMessage("El precio del producto es obligatorio "),
    body('price')
        .isNumeric().withMessage("El precio debe ser un numero"),
    body('description')
        .notEmpty().withMessage("La descripción del producto es requerido"),
    body('quantity')
        .notEmpty().withMessage("La cantidad de producto es requerido"),
    handleInputErrors,
    ProductController.newProduct // Controlador que maneja la lógica de añadir un producto
);

route.get(
    '/get-products',
    authenticate,
    ProductController.getProducts // Controlador que maneja la lógica de obtener todos los productos
)

route.get(
    '/get-product/:productId',
    param('productId')
     .isNumeric().withMessage('ID de producto no válido')
     .notEmpty().withMessage('El product ID no debe ir vacío'),
    handleInputErrors,
    ProductController.getProductById // Controlador que maneja la lógica de obtener un producto por ID
)

export default route;