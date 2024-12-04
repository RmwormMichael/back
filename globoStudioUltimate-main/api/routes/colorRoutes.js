// routes/colorRoutes.js
import express from "express";
import { getColores, getColorById, crearColor, actualizarColor, eliminarColor } from "../controllers/colorController.js";

const router = express.Router();

// Rutas CRUD para colores
router.get("/", getColores);
router.get("/:id", getColorById);
router.post("/", crearColor);
router.put("/:id", actualizarColor);
router.delete("/:id", eliminarColor);

export default router;