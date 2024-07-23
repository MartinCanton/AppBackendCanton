const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/products.json';

// Leer productos desde el archivo
const readProducts = () => {
  if (!fs.existsSync(path)) {
    return [];
  }
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

// Escribir productos en el archivo
const writeProducts = (products) => {
  fs.writeFileSync(path, JSON.stringify(products, null, 2));
};

//  GET /
router.get('/', (req, res) => {
  const products = readProducts();
  const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
  res.json(products.slice(0, limit));
});

//  GET /:pid
router.get('/:pid', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

//  POST /
router.post('/', (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: Date.now().toString(), // Generar ID único
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status !== undefined ? req.body.status : true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || []
  };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// PUT /:pid
router.put('/:pid', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.pid);
  if (index !== -1) {
    const updatedProduct = { ...products[index], ...req.body, id: products[index].id };
    products[index] = updatedProduct;
    writeProducts(products);
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

// DELETE /:pid
router.delete('/:pid', (req, res) => {
  let products = readProducts();
  const index = products.findIndex(p => p.id === req.params.pid);
  if (index !== -1) {
    products = products.filter(p => p.id !== req.params.pid);
    writeProducts(products);
    res.status(204).send("Product deleted");
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;
