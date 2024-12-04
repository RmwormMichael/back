// controllers/orderItemController.js
import OrderItem from "../models/order_item.js";

// Crear un nuevo detalle de pedido
const createOrderItem = async (req, res) => {
    const { id_order, product_id, quantity, price } = req.body;

    try {
        const orderItemData = {
            id_order,
            product_id,
            quantity,
            price
        };

        await OrderItem.create(orderItemData);

        res.status(200).json({ msg: "Detalle de pedido creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el detalle de pedido" });
    }
};

// Obtener todos los detalles de los pedidos
const getOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.getAll();
        res.json(orderItems);
    } catch (error) {
        console.error("Error al obtener los detalles de los pedidos:", error);
        res.status(500).json({ msg: "Error al obtener los detalles de los pedidos" });
    }
};

// Obtener un detalle de pedido por su ID
const getOrderItem = async (req, res) => {
    const { id } = req.params;

    try {
        const orderItem = await OrderItem.getById(id);
        if (!orderItem) {
            return res.status(404).json({ msg: "Detalle de pedido no encontrado" });
        }
        res.json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el detalle de pedido" });
    }
};

// Actualizar un detalle de pedido
const updateOrderItem = async (req, res) => {
    const { id } = req.params;
    const { id_order, product_id, quantity, price } = req.body;

    try {
        const orderItem = await OrderItem.getById(id);
        if (!orderItem) {
            return res.status(404).json({ msg: "Detalle de pedido no encontrado" });
        }

        const updatedOrderItem = { id_order, product_id, quantity, price };
        await OrderItem.update(id, updatedOrderItem);

        res.status(200).json({ msg: "Detalle de pedido actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el detalle de pedido" });
    }
};

// Eliminar un detalle de pedido
const deleteOrderItem = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await OrderItem.delete(id);
        if (!result) {
            return res.status(404).json({ msg: "Detalle de pedido no encontrado" });
        }
        res.json({ msg: "Detalle de pedido eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el detalle de pedido" });
    }
};

export { createOrderItem, getOrderItems, getOrderItem, updateOrderItem, deleteOrderItem };