import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/slice/authSlice';
import { clearCart } from '../../Redux/slice/cartSlice';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart);
    navigate('/');
  };
  return (
    <div className="p-6">
      <div className=" mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xxl font-medium">Admin Deshboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-y-2 gap-2'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-y-2 gap-2 transition-colors duration-300'
          }
        >
          <FaUser /> <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-y-2 gap-2'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-y-2 gap-2 transition-colors duration-300'
          }
        >
          <FaBoxOpen /> <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-y-2 gap-2'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-y-2 gap-2 transition-colors duration-300'
          }
        >
          <FaClipboardList /> <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-y-2 gap-2'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-y-2 gap-2 transition-colors duration-300'
          }
        >
          <FaStore /> <span>Shops</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-700 text-white rounded flex items-center justify-center space-x-2 py-3"
        >
          <FaSignOutAlt /> <span>Logout</span>{' '}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
