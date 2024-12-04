// controllers/colorController.js
import Color from '../models/color.js';

// Obtener todos los colores
const getColores = async (req, res) => {
    try {
        const colores = await Color.getAll();
        res.json(colores);
    } catch (error) {
        console.error("Error al obtener colores:", error);
        res.status(500).json({ msg: "Error al obtener los colores" });
    }
};

// Obtener un color por su ID
const getColorById = async (req, res) => {
    const { id } = req.params;

    try {
        const color = await Color.getById(id);
        if (!color) {
            return res.status(404).json({ msg: "Color no encontrado" });
        }
        res.json(color);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el color" });
    }
};

// Crear un nuevo color
const crearColor = async (req, res) => {
    const { color } = req.body;

    try {
        const colorData = { color };
        const resultado = await Color.create(colorData);
        res.status(201).json({ msg: "Color creado correctamente", resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el color" });
    }
};

// Actualizar un color
const actualizarColor = async (req, res) => {
    const { id } = req.params; // Obtener el id del parámetro de la URL


    try {
        // Verificar si el color existe en la base de datos
        const color = await Color.getById(id);
        if (!color) {
            return res.status(404).json({ msg: "Color no encontrado" });
        }

        // Actualizar el color con el nuevo nombre
        const colorData = { color };
        await Color.update(id, colorData);

        // Responder con éxito
        res.json({ msg: "Color actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el color" });
    }
};


// Eliminar un color
const eliminarColor = async (req, res) => {
    const { id } = req.params;

    try {
        const color = await Color.getById(id);
        if (!color) {
            return res.status(404).json({ msg: "Color no encontrado" });
        }

        await Color.delete(id);
        res.json({ msg: "Color eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el color" });
    }
};

export {
    getColores,
    getColorById,
    crearColor,
    actualizarColor,
    eliminarColor
};