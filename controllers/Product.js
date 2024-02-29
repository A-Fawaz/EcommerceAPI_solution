const Product = require("../models/products");

const addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).json({ message: "Error adding product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const query = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(query);
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
const getProductsSortedByPrice = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ price: 1 });
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
const getProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found!" });
    }
    res.send(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
const updateProductById = async (req, res) => {
  try {
    const ProductId = req.params.id;
    const { name, description } = req.body;
    if (!name && !description) {
      return res.status(400).json({
        message: "Provide at least 'name' or 'description' for update",
      });
    }
    const updates = {};
    if (name) {
      updates.name = name;
    }
    if (description) {
      updates.description = description;
    }
    const product = await Product.findByIdAndUpdate(ProductId, updates, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductStockById = async (req, res) => {
  try {
    const ProductId = req.params.id;
    const { stock } = req.body;
    if (!stock) {
      return res.status(400).json({
        message: "Provide at least 'stock' for update",
      });
    }

    const product = await Product.findByIdAndUpdate(
      ProductId,
      { stock: stock },
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const ProductId = req.params.id;

    const product = await Product.findByIdAndDelete(ProductId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProductById,
  deleteProductById,
  updateProductStockById,
  getProductsSortedByPrice,
};
