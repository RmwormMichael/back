// models/City.js
import conectarDB from '../config/db.js';

class City {
    // Obtener todas las ciudades
    static async getAll() {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM city', (error, results) => {
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

    // Obtener una ciudad por su ID
    static async getById(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM city WHERE id_city = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);
                } else {
                    resolve(results[0]);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Crear una nueva ciudad
    static async create(data) {
        const connection = await conectarDB();
    
        try {
            // Realiza la inserción de los datos en la base de datos
            const [results] = await connection.promise().query('INSERT INTO city SET ?', data);
    
            // Retorna los resultados de la inserción
            return results;
    
        } catch (error) {
            // Maneja cualquier error durante la operación
            throw new Error('Error al crear la ciudad: ' + error.message);
        } finally {
            // Cierra la conexión, sin importar si hubo error o no
            connection.end();
        }
    }
    

    // Actualizar una ciudad por su ID
    static async update(id, data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('UPDATE city SET ? WHERE id_city = ?', [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.affectedRows === 0) {
                    resolve(null);
                } else {
                    resolve(results);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Eliminar una ciudad por su ID
    static async delete(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM city WHERE id_city = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.affectedRows === 0) {
                    resolve(null);
                } else {
                    resolve(results);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }
}

export default City;
