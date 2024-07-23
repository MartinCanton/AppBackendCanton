const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/carts.json';

// Leer carritos desde el archivo
const readCarts = () => {
  if (!fs.existsSync(path)) {
    return [];
  }
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

// Escribir carritos en el archivo
const writeCarts = (carts) => {
  fs.writeFileSync(path, JSON.stringify(carts, null, 2));
};

//  POST /
router.post('/', (req, res) => {
  const carts = readCarts();
  const newCart = {
    id: Date.now().toString(), // Generar ID único
    products: []
  };
  carts.push(newCart);
  writeCarts(carts);
  res.status(201).json(newCart);
});

//  GET /:cid
router.get('/:cid', (req, res) => {
  const carts = readCarts();
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).send('Cart not found');
  }
});

//  POST /:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
  const carts = readCarts();
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    writeCarts(carts);
    res.json(cart);
  } else {
    res.status(404).send('Cart not found');
  }
});

module.exports = router;
