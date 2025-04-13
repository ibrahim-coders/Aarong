import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 italic">Aarong</h2>
          <p className="mt-2 text-sm">
            Your trusted e-commerce store for quality fashion and lifestyle
            products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-600">
                Men
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-orange-600">
                Women
              </Link>
            </li>
            <li>
              <Link to="/topwear" className="hover:text-orange-600">
                TOP WEAR
              </Link>
            </li>
            <li>
              <Link to="/bottomwear" className="hover:text-orange-600">
                BOTTOM WEAR
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="hover:text-orange-600">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-orange-600">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-orange-600">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-orange-600">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-xl text-gray-700 hover:text-blue-600" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl text-gray-700 hover:text-pink-500" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl text-gray-700 hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm border-t pt-4">
        <p>
          &copy; {new Date().getFullYear()} AarongWebsite. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
