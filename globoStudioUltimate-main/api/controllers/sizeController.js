// controllers/sizeController.js
import Size from "../models/size.js";

// Crear un nuevo tamaño
const createSize = async (req, res) => {
    const { size } = req.body;

    try {
        const sizeData = {
            size
        };

        await Size.create(sizeData);

        res.status(200).json({ msg: "Tamaño creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el tamaño" });
    }
};

// Obtener todos los tamaños
const getSizes = async (req, res) => {
    try {
        const sizes = await Size.getAll();
        res.json(sizes);
    } catch (error) {
        console.error("Error al obtener tamaños:", error);
        res.status(500).json({ msg: "Error al obtener los tamaños" });
    }
};

// Obtener un tamaño por su ID
const getSize = async (req, res) => {
    const { id } = req.params;

    try {
        const size = await Size.getById(id);
        if (!size) {
            return res.status(404).json({ msg: "Tamaño no encontrado" });
        }
        res.json(size);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el tamaño" });
    }
};

// Actualizar un tamaño
const updateSize = async (req, res) => {
    const { id } = req.params;

    try {
        const size = await Size.getById(id);
        if (!size) {
            return res.status(404).json({ msg: "Tamaño no encontrado" });
        }

        const updatedSize = { size };
        await Size.update(id, updatedSize);

        res.status(200).json({ msg: "Tamaño actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el tamaño" });
    }
};

// Eliminar un tamaño
const deleteSize = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Size.delete(id);
        if (!result) {
            return res.status(404).json({ msg: "Tamaño no encontrado" });
        }
        res.json({ msg: "Tamaño eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el tamaño" });
    }
};

export { createSize, getSizes, getSize, updateSize, deleteSize };