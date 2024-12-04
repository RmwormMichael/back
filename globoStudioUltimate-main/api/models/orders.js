// models/Orders.js
import conectarDB from '../config/db.js';

class Orders {

    // Obtener todos los pedidos
    static async getAll() {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM orders', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Devuelve todos los pedidos
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión
        });
    }

    // Obtener un pedido por su ID
    static async getById(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM orders WHERE id_order = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el pedido
                } else {
                    resolve(results[0]);  // Devuelve el pedido encontrado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Crear un nuevo pedido
    static async create(data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO orders SET ?', data, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna el ID del nuevo pedido insertado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Actualizar un pedido por su ID
    static async update(id, data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('UPDATE orders SET ? WHERE id_order = ?', [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.affectedRows === 0) {
                    resolve(null);  // Si no se actualizó ningún pedido
                } else {
                    resolve(results);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Eliminar un pedido por su ID
    static async delete(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM orders WHERE id_order = ?', [id], (error, results) => {
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

export default Orders;