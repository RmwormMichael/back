// routes/orderItemRoutes.js
import express from "express";
import { createOrderItem, getOrderItems, getOrderItem, updateOrderItem, deleteOrderItem } from "../controllers/orderItemController.js";

const router = express.Router();

// Rutas CRUD para los detalles de los pedidos
router.post("/", createOrderItem);  // Crear un nuevo detalle de pedido
router.get("/", getOrderItems);  // Obtener todos los detalles de los pedidos
router.get("/:id", getOrderItem);  // Obtener un detalle de pedido por ID
router.put("/:id", updateOrderItem);  // Actualizar un detalle de pedido
router.delete("/:id", deleteOrderItem);  // Eliminar un detalle de pedido

export default router;