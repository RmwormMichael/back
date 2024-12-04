// models/Size.js
import conectarDB from '../config/db.js';

class Size {

    // Obtener todos los tamaños
    static async getAll() {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM size', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Devuelve los tamaños
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión
        });
    }

    // Obtener un tamaño por su ID
    static async getById(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM size WHERE id_size = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el tamaño
                } else {
                    resolve(results[0]);  // Retorna el tamaño encontrado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Crear un nuevo tamaño
    static async create(data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO size SET ?', data, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna el ID del nuevo tamaño insertado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Actualizar un tamaño por su ID
    static async update(id, data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('UPDATE size SET ? WHERE id_size = ?', [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.affectedRows === 0) {
                    resolve(null);  // Si no se actualizó ningún tamaño
                } else {
                    resolve(results);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Eliminar un tamaño por su ID
    static async delete(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM size WHERE id_size = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }
}

export default Size;