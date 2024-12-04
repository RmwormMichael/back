// models/Points.js
import conectarDB from '../config/db.js';

class Points {

    // Obtener todos los puntos
    static async getAll() {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM points', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Devuelve todos los puntos
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión
        });
    }

    // Obtener un punto por su ID
    static async getById(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM points WHERE id_point = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el punto
                } else {
                    resolve(results[0]);  // Devuelve el punto encontrado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Crear un nuevo punto
    static async create(data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO points SET ?', data, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna el ID del nuevo punto insertado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Actualizar un punto por su ID
    static async update(id, data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('UPDATE points SET ? WHERE id_point = ?', [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.affectedRows === 0) {
                    resolve(null);  // Si no se actualizó ningún punto
                } else {
                    resolve(results);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Eliminar un punto por su ID
    static async delete(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM points WHERE id_point = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna el resultado de la eliminación
                }
            });
        }).finally(() => {
            connection.end();
        });
    }
}

export default Points;