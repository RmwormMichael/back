// routes/pointsRoutes.js
import express from "express";
import { createPoint, getPoints, getPoint, updatePoint, deletePoint } from "../controllers/pointsController.js";

const router = express.Router();

// Rutas CRUD para los puntos
router.post("/", createPoint);  // Crear un punto
router.get("/", getPoints);  // Obtener todos los puntos
router.get("/:id", getPoint);  // Obtener un punto por ID
router.put("/:id", updatePoint);  // Actualizar un punto
router.delete("/:id", deletePoint);  // Eliminar un punto

export default router;