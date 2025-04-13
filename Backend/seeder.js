require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Products');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products');

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin User
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'Admin@gmail.com',
      password: '123456',
      role: 'admin',
    });

    const userId = createdUser._id;
    const sampleProduct = products.map(product => {
      return { ...product, user: userId };
    });

    await Product.insertMany(sampleProduct);
    console.log('Product data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding the data:', error);
    process.exit(1);
  }
};

seedData();
