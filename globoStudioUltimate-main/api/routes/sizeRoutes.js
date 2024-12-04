// routes/sizeRoutes.js
import express from "express";
import { createSize, getSizes, getSize, updateSize, deleteSize } from "../controllers/sizeController.js";

const router = express.Router();

// Rutas CRUD para tamaños
router.post("/", createSize);  // Crear un tamaño
router.get("/", getSizes);  // Obtener todos los tamaños
router.get("/:id", getSize);  // Obtener un tamaño por ID
router.put("/:id", updateSize);  // Actualizar un tamaño
router.delete("/:id", deleteSize);  // Eliminar un tamaño

export default router;