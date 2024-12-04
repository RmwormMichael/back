// models/Product.js
import conectarDB from '../config/db.js';

class Product {

    // Obtener todos los productos
    static async getAll() {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM product', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Devuelve todos los productos
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión
        });
    }

    // Obtener un producto por su ID
    static async getById(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM product WHERE id_product = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el producto
                } else {
                    resolve(results[0]);  // Devuelve el producto encontrado
                }
            });}).finally(() => {
                connection.end();
            });
        }
    
        // Crear un nuevo producto
        static async create(data) {
            const connection = await conectarDB();
            return new Promise((resolve, reject) => {
                connection.query('INSERT INTO product SET ?', data, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);  // Retorna el ID del nuevo producto insertado
                    }
                });
            }).finally(() => {
                connection.end();
            });
        }
    
        // Actualizar un producto por su ID
        static async update(id, data) {
            const connection = await conectarDB();
            return new Promise((resolve, reject) => {
                connection.query('UPDATE product SET ? WHERE id_product = ?', [data, id], (error, results) => {
                    if (error) {
                        reject(error);
                    } else if (results.affectedRows === 0) {
                        resolve(null);  // Si no se actualizó ningún producto
                    } else {
                        resolve(results);
                    }
                });
            }).finally(() => {
                connection.end();
            });
        }
    
        // Eliminar un producto por su ID
        static async delete(id) {
            const connection = await conectarDB();
            return new Promise((resolve, reject) => {
                connection.query('DELETE FROM product WHERE id_product = ?', [id], (error, results) => {
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
    
    export default Product;