// controllers/productController.js
import Product from "../models/product.js";

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, price, timestamp, size, color, id_category } = req.body;

    try {
        const productData = {
            name,
            price,
            timestamp,
            size,
            color,
            id_category
        };

        await Product.create(productData);

        res.status(200).json({ msg: "Producto creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el producto" });
    }
};

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ msg: "Error al obtener los productos" });
    }
};

// Obtener un producto por su ID
const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.getById(id);
        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el producto" });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, timestamp, size, color, id_category} = req.body;

    try {
        const product = await Product.getById(id);
        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        const updatedProduct = { name, price, timestamp, size, color, id_category};
        await Product.update(id, updatedProduct);

        res.status(200).json({ msg: "Producto actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el producto" });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Product.delete(id);
        if (!result) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el producto" });
    }
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };