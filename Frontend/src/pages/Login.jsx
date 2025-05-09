import { useEffect, useState } from 'react';
import loginImage from '../assets/men-login.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { mergeCart } from '../Redux/slice/cartSlice';
const Login = () => {
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
    try {
      dispatch(loginUser({ email, password }));
      navigate(isChackoutRedirect ? '/checkout' : '/');
      toast.success('Login successfully!');
    } catch (error) {
      toast.error(error);
    }

    console.log({ email, password });
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
              <Link href="#" className="text-sm text-black hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full  p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-950 "
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm">
            Don't have an account?{' '}
            <Link
              to={`/register?redireact=${encodeURIComponent(redireact)}`}
              className="text-black"
            >
              Register
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

export default Login;
