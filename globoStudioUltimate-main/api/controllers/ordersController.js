// controllers/ordersController.js
import Orders from "../models/orders.js";

// Crear un nuevo pedido
const createOrder = async (req, res) => {
    const { points, status, date_order, direction, id_user, timestamp } = req.body;

    try {
        const orderData = {
            points,
            status,
            date_order,
            direction,
            id_user,
            timestamp
        };

        await Orders.create(orderData);

        res.status(200).json({ msg: "Pedido creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el pedido" });
    }
};

// Obtener todos los pedidos
const getOrders = async (req, res) => {
    try {
        const orders = await Orders.getAll();
        res.json(orders);
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        res.status(500).json({ msg: "Error al obtener los pedidos" });
    }
};

// Obtener un pedido por su ID
const getOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Orders.getById(id);
        if (!order) {
            return res.status(404).json({ msg: "Pedido no encontrado" });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el pedido" });
    }
};

// Actualizar un pedido
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { points, status, date_order, direction, id_user, timestamp } = req.body;

    try {
        const order = await Orders.getById(id);
        if (!order) {
            return res.status(404).json({ msg: "Pedido no encontrado" });
        }

        const updatedOrder = { points, status, date_order, direction, id_user, timestamp };
        await Orders.update(id, updatedOrder);

        res.status(200).json({ msg: "Pedido actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el pedido" });
    }
};

// Eliminar un pedido
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Orders.delete(id);
        if (!result) {
            return res.status(404).json({ msg: "Pedido no encontrado" });
        }
        res.json({ msg: "Pedido eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el pedido" });
    }
};

export { createOrder, getOrders, getOrder, updateOrder, deleteOrder };