// controllers/pointsController.js
import Points from "../models/points.js";

// Crear un nuevo punto
const createPoint = async (req, res) => {
    const { name, latitude, longitude, description, city_id } = req.body;

    try {
        const pointData = {
            name,
            latitude,
            longitude,
            description,
            city_id
        };

        await Points.create(pointData);

        res.status(200).json({ msg: "Punto creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el punto" });
    }
};

// Obtener todos los puntos
const getPoints = async (req, res) => {
    try {
        const points = await Points.getAll();
        res.json(points);
    } catch (error) {
        console.error("Error al obtener puntos:", error);
        res.status(500).json({ msg: "Error al obtener los puntos" });
    }
};

// Obtener un punto por su ID
const getPoint = async (req, res) => {
    const { id } = req.params;

    try {
        const point = await Points.getById(id);
        if (!point) {
            return res.status(404).json({ msg: "Punto no encontrado" });
        }
        res.json(point);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el punto" });
    }
};

// Actualizar un punto
const updatePoint = async (req, res) => {
    const { id } = req.params;
    const { name, latitude, longitude, description, city_id } = req.body;

    try {
        const point = await Points.getById(id);
        if (!point) {
            return res.status(404).json({ msg: "Punto no encontrado" });
        }

        const updatedPoint = { name, latitude, longitude, description, city_id };
        await Points.update(id, updatedPoint);

        res.status(200).json({ msg: "Punto actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el punto" });
    }
};

// Eliminar un punto
const deletePoint = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Points.delete(id);
        if (!result) {
            return res.status(404).json({ msg: "Punto no encontrado" });
        }
        res.json({ msg: "Punto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el punto" });
    }
};

export { createPoint, getPoints, getPoint, updatePoint, deletePoint };