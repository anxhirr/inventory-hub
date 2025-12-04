const express = require('express');
const router = express.Router();
const { Product, Currency } = require('../models');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Currency,
        as: 'currency',
        attributes: ['id', 'code', 'name', 'symbol']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Currency,
        as: 'currency',
        attributes: ['id', 'code', 'name', 'symbol']
      }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const productWithCurrency = await Product.findByPk(product.id, {
      include: [{
        model: Currency,
        as: 'currency',
        attributes: ['id', 'code', 'name', 'symbol']
      }]
    });
    res.status(201).json(productWithCurrency);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Barcode already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.update(req.body);
    const updatedProduct = await Product.findByPk(product.id, {
      include: [{
        model: Currency,
        as: 'currency',
        attributes: ['id', 'code', 'name', 'symbol']
      }]
    });
    res.json(updatedProduct);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Barcode already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

