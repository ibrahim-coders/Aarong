import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Redux/slice/cartSlice';

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { checkout } = useSelector(state => state.checkout);

  //clear the cart when the is comformed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem('cart');
    } else {
      navigate('/my-order');
    }
  }, [checkout, dispatch, navigate]);

  const totalAmount = checkout.checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
        Thank you for your order!
      </h2>

      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Order ID: <strong>{checkout._id}</strong>
        </p>
        <p className="text-gray-600">
          Date: {checkout.creacted.toLocaleDateString()}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Shipping Address</h3>
      <div className="mb-6 text-gray-700">
        <p>{checkout.shippingAddress.address}</p>
        <p>
          {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
      <div className="space-y-4">
        {checkout.checkoutItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium">
                {item.name} ({item.color})
              </p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold text-green-700">
          Total: ${totalAmount}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
