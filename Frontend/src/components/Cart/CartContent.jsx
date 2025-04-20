import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../../Redux/slice/cartSlice';

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {cart?.products.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-4 border-b"
        >
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 ml-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">
              {product.size} | {product.color}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center mt-2 gap-2">
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
                className="border px-2 text-lg font-medium rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="font-medium">{product.quantity}</span>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
                className="border px-2 text-lg font-medium rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Remove Item Button */}
          <div className="ml-4">
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
              className="text-red-600 hover:text-red-800"
            >
              <FaRegTrashAlt className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}

      {/* Cart Total Price */}
      <div className="mt-4 flex justify-between items-center">
        <h4 className="font-semibold">Total:</h4>
        <span className="font-medium text-xl">
          ${cart?.totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartContent;
