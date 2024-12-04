// models/OrderItem.js
import conectarDB from '../config/db.js';

class OrderItem {

    // Obtener todos los detalles de los pedidos (order items)
    static async getAll() {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM order_item', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Devuelve todos los detalles de pedidos
                }
            });
        }).finally(() => {
            connection.end();  // Cierra la conexión
        });
    }

    // Obtener un detalle de pedido por su ID
    static async getById(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM order_item WHERE id_order_item = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);  // Si no se encuentra el detalle del pedido
                } else {
                    resolve(results[0]);  // Devuelve el detalle del pedido encontrado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Crear un nuevo detalle de pedido
    static async create(data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO order_item SET ?', data, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);  // Retorna el ID del nuevo detalle de pedido insertado
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Actualizar un detalle de pedido por su ID
    static async update(id, data) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('UPDATE order_item SET ? WHERE id_order_item = ?', [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.affectedRows === 0) {
                    resolve(null);  // Si no se actualizó ningún detalle de pedido
                } else {
                    resolve(results);
                }
            });
        }).finally(() => {
            connection.end();
        });
    }

    // Eliminar un detalle de pedido por su ID
    static async delete(id) {
        const connection = await conectarDB();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM order_item WHERE id_order_item = ?', [id], (error, results) => {
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

export default OrderItem;