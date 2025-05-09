import { useEffect, useState } from 'react';
import loginImage from '../assets/women-regiser.jpg';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../Redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { mergeCart } from '../Redux/slice/cartSlice';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);

  // get redireact parameter and chack if it 's checkout or somthing else

  const redireact = new URLSearchParams(location.search).get('redirect') || '/';

  const isChackoutRedirect = redireact.includes('checkout');

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isChackoutRedirect ? '/checkout' : '/');
        });
      } else {
        navigate(isChackoutRedirect);
      }
    }
  }, [user, guestId, cart, navigate, isChackoutRedirect, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    navigate(isChackoutRedirect ? '/checkout' : '/');
    toast.success('Register successfully!');
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 my-6 ">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden ">
        {/* Left side: Login Form */}

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center">Aarong</h2>
          <h2 className="text-2xl font-semibold text-center mb-6 ">
            Hey there! 👋
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md "
                placeholder="Enter your email address"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full mt-2 p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-950 "
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-orange-600"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right side: Image */}
        <div className="hidden md:block w-1/2 ">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover object-center "
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
