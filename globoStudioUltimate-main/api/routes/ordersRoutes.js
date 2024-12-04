// routes/ordersRoutes.js
import express from "express";
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from "../controllers/ordersController.js";

const router = express.Router();

// Rutas CRUD para los pedidos
router.post("/", createOrder);  // Crear un nuevo pedido
router.get("/", getOrders);  // Obtener todos los pedidos
router.get("/:id", getOrder);  // Obtener un pedido por ID
router.put("/:id", updateOrder);  // Actualizar un pedido
router.delete("/:id", deleteOrder);  // Eliminar un pedido

export default router;