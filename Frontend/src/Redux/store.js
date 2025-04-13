import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productsReducer from './slice/productsSlice';
import cartReducer from './slice/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
