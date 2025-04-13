import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';

const cart = {
  products: [
    {
      name: 'Stylish Jacket',
      size: 'M',
      color: 'White',
      price: 30,
      image: 'https://picsum.photos/150?random=1',
    },
    {
      name: 'Stylish Jacket',
      size: 'M',
      color: 'White',
      price: 30,
      image: 'https://picsum.photos/150?random=2',
    },
  ],
  totalPrice: 60,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
    phone: '',
  });

  const handleChange = e => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCheckoutId(123); // placeholder, might want to replace this with actual checkout ID
    console.log('Shipping Address:', shippingAddress);
  };

  const handlePaymentSuccess = details => {
    console.log('Payment successfully completed:', details);
    navigate('/order-confirmation');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto py-10 px-6">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Shipping Address</h2>
          <div className="mb-2 grid grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value="abc@gamil.com"
                className="w-full p-2 border rounded"
                disabled
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-2 grid grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={shippingAddress.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={shippingAddress.lastName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-2 grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          <div className="mb-2 grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-600">Postcode</label>
              <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                value={shippingAddress.postcode}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">
                  Pay with PayPal
                  <PaypalButton
                    amount={60}
                    onSuccess={handlePaymentSuccess}
                    onError={err => alert('Payment failed, please try again.')}
                  />
                </h3>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {cart.products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b mb-4"
          >
            <img src={product.image} alt={product.name} className="w-16 h-16" />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">
                {product.size} | {product.color}
              </p>
              <p className="font-bold">${product.price}</p>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center text-lg mb-2">
          <p>Subtotal</p>
          <p className="font-bold">${cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center text-lg mb-2">
          <p>Shipping</p>
          <p className="text-green-600 font-semibold">Free</p>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between items-center text-xl font-bold">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
