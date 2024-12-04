// routes/cityRoutes.js
import express from 'express';
const router = express.Router();
import { getCities, getCity, createCity, updateCity, deleteCity } from '../controllers/cityController.js';

// Rutas para el CRUD de City
router.get('/', getCities);
router.get('/:id', getCity);
router.post('/', createCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;
