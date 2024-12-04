// controllers/cityController.js
import City from '../models/city.js';

// Obtener todas las ciudades
const getCities = async (req, res) => {
    try {
        const cities = await City.getAll();
        res.json(cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las ciudades" });
    }
};

// Obtener una ciudad por su ID
const getCity = async (req, res) => {
    const { id } = req.params;
    try {
        const city = await City.getById(id);
        if (!city) {
            return res.status(404).json({ msg: "Ciudad no encontrada" });
        }
        res.json(city);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener la ciudad" });
    }
};

// Crear una nueva ciudad
const createCity = async (req, res) => {
    const { name } = req.body;
    const cityData = { name };
    try {
        await City.create(cityData);
        res.status(201).json({ msg: "Ciudad creada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la ciudad" });
    }
};

// Actualizar una ciudad por su ID
const updateCity = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const cityData = { name };
    try {
        const result = await City.update(id, cityData);
        if (!result) {
            return res.status(404).json({ msg: "Ciudad no encontrada" });
        }
        res.json({ msg: "Ciudad actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la ciudad" });
    }
};

// Eliminar una ciudad por su ID
const deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await City.delete(id);
        if (!result) {
            return res.status(404).json({ msg: "Ciudad no encontrada" });
        }
        res.json({ msg: "Ciudad eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la ciudad" });
    }
};

export { getCities, getCity, createCity, updateCity, deleteCity };
