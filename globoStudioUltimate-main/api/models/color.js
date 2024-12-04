// models/Color.js
import conectarDB from '../config/db.js';

class Color {

    // Obtener todos los colores
    static async getAll() {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM color', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Devuelve todos los colores
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    // Obtener un color por su ID
    static async getById(id) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM color WHERE id_color = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el color
                } else {
                    resolve(results[0]);  // Devuelve el color encontrado
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    // Crear un nuevo color
    static async create(data) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO color SET ?', data, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna el ID del nuevo color insertado
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    // Actualizar un color
    static async update(id, data) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('UPDATE color SET ? WHERE id_color = ?', [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna los resultados de la actualización
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    // Eliminar un color por su ID
    static async delete(id) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM color WHERE id_color = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna los resultados de la eliminación
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }
}

export default Color;