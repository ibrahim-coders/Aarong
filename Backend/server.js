const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routers
const userRouter = require('./routers/userRouters');
const productRouter = require('./routers/productRoutes');
const cartRouter = require('./routers/cartRouters');
const checkoutRouter = require('./routers/checkOutRouters');
const orderRouter = require('./routers/orderRoutes');
const uploadeRouter = require('./routers/uploadeRouters');
const adminRouter = require('./routers/adminRouters');
const productsAdminRouter = require('./routers/productAdminRouters');
const Cart = require('./models/Cart');

// ✅ Import Product model
const Product = require('./models/Products');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Port
const PORT = process.env.PORT || 9000;

// ✅ Connect to MongoDB
connectDB();
// products;
// Root route
app.get('/', (req, res) => {
  res.send('Welcome To Aarong API');
});

// Get all products with optional query filters
app.get('/products', async (req, res) => {
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

// ✅ Best Seller Route
app.get('/best-seller', async (req, res) => {
  try {
    const bestSeller = await Product.find().sort({ rating: -1 });
    if (!bestSeller || bestSeller.length === 0) {
      return res.status(404).json({ message: 'No best seller found' });
    }
    res.status(200).json(bestSeller);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/new-arrivals', async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(10);

    res.json(newArrivals);
  } catch (error) {
    console.error('New Arrivals Error:', error.message);
    res.status(500).send('Server Error');
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID' });
  }
});

// Get similar products based on gender and category
app.get('/products/similar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // exclude current product
      gender: product.gender,
      category: product.category,
    }).limit(4); // you can adjust the number

    res.status(200).json(similarProducts);
  } catch (error) {
    console.error('Similar Products Error:', error.message);
    res.status(500).send('Server Error');
  }
});

// ✅ API Routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadeRouter);

// ✅ Admin Routes
app.use('/api/admin/users', adminRouter);
app.use('/api/admin', productsAdminRouter);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
