import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import UserLayout from '../components/Layout/UserLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import CollectionPage from '../pages/CollectionPage';
import ProductDetails from '../components/Products/ProductDeteails';
import Checkout from '../components/Cart/Checkout';
import AdminLayout from '../components/Admin/AdminLayout';
import AdminHomePage from '../pages/AdminHomePage';
import UserManagment from '../components/Admin/UserManagment';
import ProductManagnent from '../components/Admin/ProductManagnent';
import EditProductPage from '../components/Admin/EditProductPage';
import OrderManagement from '../components/Admin/OrderManagement';
import { Provider } from 'react-redux';
import store from '../Redux/store';
const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Toaster position="top-right" />
        <Routes>
          {/* User layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />

            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          {/* Add other routes here */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagment />} />
            <Route path="products" element={<ProductManagnent />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
