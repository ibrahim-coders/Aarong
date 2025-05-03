const express = require('express');
const Product = require('../models/Products');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new product (Private/Admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collection,
      meterial,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collection,
      meterial,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Product creation failed in server');
  }
});

// Update a product (Private/Admin)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collection,
      meterial,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collection = collection || product.collection;
    product.meterial = meterial || product.meterial;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished =
      isPublished !== undefined ? isPublished : product.isPublished;
    product.tags = tags || product.tags;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;
    product.sku = sku || product.sku;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a product (Private/Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' });
    }
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get all products with optional query filters
router.get('/', async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      meterial,
      brand,
      limit,
    } = req.query;

    let query = {};
    if (collection && collection.toLocaleLowerCase() !== 'all') {
      query.collection = collection;
    }
    if (category && category.toLocaleLowerCase() !== 'all') {
      query.category = category;
    }
    if (meterial) {
      query.meterial = { $in: meterial.split(',') };
    }
    if (brand) {
      query.brand = { $in: brand.split(',') };
    }
    if (size) {
      query.sizes = { $in: size.split(',') };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'priceAsc':
          sort = { price: 1 };
          break;
        case 'priceDesc':
          sort = { price: -1 };
          break;
        case 'popularity':
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single product by id
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

router.get('/:id', async (req, res) => {
  ssss;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID' });
  }
});
// Get similar products (fetch based on gender and category)
router.get('/single/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Best-seller route first
// In your productRoutes.js
// In your productRoutes.js
router.get('/best-seller', async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller) {
      return res.status(404).json({ message: 'No best seller found' });
    }
    res.status(200).json(bestSeller);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// get / api / product / new- arrivals

router.get('/new-arrivals', async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(10);
    console.log(newArrivals);
    res.json(newArrivals);
  } catch (error) {
    console.error('New Arrivals Error:', error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
