// controllers/categoryController.js
import Category from "../models/category.js";

// Crear una nueva categoría
export const crearCategoria = async (req, res) => {
    const { name } = req.body;
    try {
        const nuevaCategoria = await Category.create({ name });
        res.status(201).json({ message: "Categoría creada con éxito", categoria: nuevaCategoria });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la categoría", error });
    }
};

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Category.getAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las categorías", error });
    }
};

// Obtener una categoría por su ID
export const obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Category.getById(id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la categoría", error });
    }
};

// Actualizar una categoría por su ID
export const actualizarCategoria = async (req, res) => {
    const { id } = req.params; 
    const { name } = req.body; 

    try {
        // Asegúrate de que la categoría exista antes de intentar actualizarla
        const categoriaActualizada = await Category.update(id, { name });
        
        if (!categoriaActualizada) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.status(200).json({ message: "Categoría actualizada con éxito", categoria: categoriaActualizada });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la categoría", error });
    }
};


// Eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaEliminada = await Category.delete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la categoría", error });
    }
};
