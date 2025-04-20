const express = require('express');
const Product = require('../models/Products');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/products', protect, admin, async (req, res) => {
  console.log('Fetching admin products...'); // Add this
  try {
    const products = await Product.find({});
    console.log('Products found:', products.length); // Add this
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
