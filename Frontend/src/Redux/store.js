import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productsReducer from './slice/productsSlice';
import cartReducer from './slice/cartSlice';
import checkoutReducer from './slice/checkoutSlice';
import orderReducer from './slice/orderSlice';
import adminReducer from './slice/adminSlice';
import adminProductReducer from './slice/adminProductSlice';
import adminOrdersReducer from './slice/adminOrderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
