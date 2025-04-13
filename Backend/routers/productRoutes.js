const express = require('express');
const Product = require('../models/Products');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

//api/router
//creact a new product

// private/admin
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
    const creactProduct = await product.save();
    res.status(201).json(creactProduct);
  } catch (error) {
    console.error(error);
    res.status(5000).send('Product creact failed in server');
  }
});

// router put /api/products/:id
//upadte producat

// access privide/admin
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

    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
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

    // Save updated product
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// delete router /api/product/:id

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    //Find the product id
    const product = await Product.findById(req.params.id);
    if (product) {
      //remove the product from  DB
      await product.deleteOne();
      res.json({ message: 'Product remove' });
    } else {
      res.status(404).json({ massage: 'Product Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//get/api/products
//desc get all products with optional query filters
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
      if (minPrice) query.price.get = Number(minPrice);
      if (maxPrice) query.price.get = Number(maxPrice);
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

    //fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// fet api /producat/:id
//get a single product by id

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ messages: 'Product not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('single/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ meassage: 'Product not found' });
    }
    const similarProducts = await Product.find(
      {
        _id: { $ne: id },
        gender: product.gender,
        cstegory: product.category,
      }.limit(4)
    );
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//get api/products/best-seller

router.get('/best-seller', async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: 'Product not seller found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// get / api / product / new- arrivals

router.get('new-arrivals', async (req, res) => {
  try {
    //fetech new arrivals
    const newArrivalse = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivalse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
