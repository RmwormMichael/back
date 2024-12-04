import express from "express";
const router = express.Router();
import {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categoryController.js";

// Rutas de categorías
router.put("/:id", actualizarCategoria);

router.post("/", crearCategoria);
router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoriaPorId);
router.delete("/:id", eliminarCategoria);

export default router;
