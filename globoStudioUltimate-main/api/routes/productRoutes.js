// routes/productRoutes.js
import express from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

// Rutas CRUD para productos
router.post("/", createProduct);  // Crear un producto
router.get("/", getProducts);  // Obtener todos los productos
router.get("/:id", getProduct);  // Obtener un producto por ID
router.put("/:id", updateProduct);  // Actualizar un producto
router.delete("/:id", deleteProduct);  // Eliminar un producto

export default router;