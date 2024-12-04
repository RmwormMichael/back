// models/Usuario.js
import conectarDB from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from "util";


class Usuario {

    // Obtener todos los usuarios
    static async getAll() {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Asegúrate de que 'results' sea un array
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    // Obtener un usuario por su ID
    static async getById(id) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE id_user = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el usuario
                } else {
                    resolve(results[0]);  // Retorna el primer usuario encontrado
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);  // Generar el salt
        const hashedPassword = await bcrypt.hash(password, salt);  // Encriptar la contraseña
        return hashedPassword;
    }

    // Crear un nuevo usuario
    static async create(data) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise(async (resolve, reject) => {
            try {
                // Encriptar la contraseña antes de guardarla
                data.password = await Usuario.hashPassword(data.password);
                connection.query('INSERT INTO user SET ?', data, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);  // Retorna el ID del nuevo usuario insertado
                    }
                });
            } catch (err) {
                reject(err);
            }
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }


    // Actualizar un usuario por su ID
    static async update(id, data) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET ? WHERE id_user = ?', [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.affectedRows === 0) {
                    resolve(null);  // Si no se actualizó ningún usuario
                } else {
                    resolve(results);  // Retorna los resultados de la actualización
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    static delete = async (id) => {
        const connection = await conectarDB(); // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            // Verificar si el usuario existe
            const selectQuery = "SELECT * FROM user WHERE id_user = ?";
            connection.query(selectQuery, [id], (error, results) => {
                if (error) {
                    reject(error); // Si ocurre un error en la consulta, se rechaza la promesa
                } else if (results.length === 0) {
                    reject(new Error("El usuario no existe.")); // Si no se encuentra el usuario, se rechaza
                } else {
                    // Eliminar el usuario
                    const deleteQuery = "DELETE FROM user WHERE id_user = ?";
                    connection.query(deleteQuery, [id], (error, results) => {
                        if (error) {
                            reject(error); // Si ocurre un error al eliminar, se rechaza
                        } else {
                            resolve(results); // Si la eliminación es exitosa, se resuelve la promesa
                        }
                    });
                }
            });
        }).finally(() => {
            connection.end(); // Aseguramos cerrar la conexión después de completar la operación
        });
    };
    

    // Buscar usuarios por nombre
    static async searchByName(name) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE name LIKE ?', [`%${name}%`], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna los resultados de la búsqueda
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }

    static async findOne(email) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el usuario
                } else {
                    resolve(results[0]);  // Retorna el primer usuario encontrado
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }


    static async comprobarPassword(email, password) {
        const connection = await conectarDB();  // Obtener la conexión desde la función
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(false);  // Usuario no encontrado
                } else {
                    const usuario = results[0];
                    try {
                        // Comparar la contraseña proporcionada con la almacenada (encriptada)
                        const esValido = await bcrypt.compare(password, usuario.password);
                        resolve(esValido);  // Devuelve 'true' si las contraseñas coinciden, 'false' si no
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión después de la consulta
        });
    }


}

export default Usuario;
