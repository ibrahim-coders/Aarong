import { Link, NavLink } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector(state => state.cart);

  const cartItemCount = cart?.products?.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-600 italic">
          Aarong
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </NavLink>
          <NavLink
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </NavLink>
          <NavLink
            to="/collections/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </NavLink>
          <NavLink
            to="/collections/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </NavLink>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          <Link
            to="admin"
            className="block bg-orange-600 text-white px-2 tex-sm rounded "
          >
            Admin
          </Link>
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          {/* Shopping Cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black cursor-pointer"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-xs rounded-full px-2 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Search Bar */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <IoMdMenu className="h-6 w-6 text-gray-700 cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleNavDrawer}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 cursor-pointer" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div>
          <ul className="flex flex-col space-y-4 px-6 text-lg font-medium">
            <h2 className="text-xl font-semibold text-orange-600 mb-4">Menu</h2>
            <NavLink
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="text-gray-700 hover:text-black"
            >
              Men
            </NavLink>
            <NavLink
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="text-gray-700 hover:text-black"
            >
              Women
            </NavLink>
            <NavLink
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="text-gray-700 hover:text-black"
            >
              Top Wear
            </NavLink>
            <NavLink
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="text-gray-700 hover:text-black"
            >
              Bottom Wear
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
