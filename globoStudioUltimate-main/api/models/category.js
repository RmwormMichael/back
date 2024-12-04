// models/Category.js
import conectarDB from '../config/db.js';

class Category {

    // Obtener todas las categorías
    static async getAll() {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category', (error, results) => {
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

    // Obtener una categoría por su ID
    static async getById(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category WHERE id_category = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra la categoría
                } else {
                    resolve(results[0]);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Crear una nueva categoría
    static async create(data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO category SET ?', data, (error, results) => {
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

    // Actualizar una categoría por su ID
    static async update(id, data) {
        const connection = await conectarDB();
    
        try {
            // Realiza la actualización en la base de datos
            const [results] = await connection.promise().query(
                'UPDATE category SET name = ? WHERE id_category = ?;',
                [data.name, id]
            );
    
            // Si no se actualizó ninguna fila, devuelve null
            if (results.affectedRows === 0) {
                return null;
            }
    
            // Si la actualización fue exitosa, retorna los resultados
            return results;
    
        } catch (error) {
            // Maneja el error y lo lanza para que se maneje en el controlador
            throw new Error('Error al actualizar la categoría: ' + error.message);
        } finally {
            // Asegúrate de cerrar la conexión
            connection.end();
        }
    }
    

    // Eliminar una categoría por su ID
    static async delete(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM category WHERE id_category = ?;', [id], (error, results) => {
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

export default Category;
