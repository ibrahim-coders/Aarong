const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routers/userRouters');
const productRouter = require('./routers/productRoutes');
const cartRouter = require('./routers/cartRouters');
const checkoutRouter = require('./routers/checkOutRouters');
const orderRouter = require('./routers/orderRoutes');
const uploadeRouter = require('./routers/uploadeRouters');
const adminRouter = require('./routers/adminRouters');
const productsAdminRouter = require('./routers/productAdminRouters');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;

// ✅ MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome To Aarong API');
});

// ✅ API router
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadeRouter);

//admin
app.use('/api/admin/users', adminRouter);
app.use('/api/admin/products', productsAdminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
