const Product = require("../models/products.model");

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(rand);
    if (!product) res.status(404).json({ message: "Not found" });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) res.status(404).json({ message: "Not found" });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = new Product({ name: name });
    await newProduct.save();
    res.json({ newProduct });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      await product.save();
      res.json({ product });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ product });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
