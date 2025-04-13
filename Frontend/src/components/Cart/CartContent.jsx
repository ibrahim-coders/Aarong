import { FaRegTrashAlt } from 'react-icons/fa';

const CartContent = () => {
  const cartProducts = [
    {
      id: 1,
      name: 'T-shirt',
      color: 'Black',
      size: 'M',
      quantity: 1,
      price: 15,
      image: 'https://via.placeholder.com/80',
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {cartProducts.map((product, index) => (
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
              <button className="border px-2 text-lg font-medium rounded hover:bg-gray-100">
                -
              </button>
              <span className="font-medium">{product.quantity}</span>
              <button className="border px-2 text-lg font-medium rounded hover:bg-gray-100">
                +
              </button>
            </div>

            {/* Price & Delete Button */}
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">${product.price.toLocaleString()}</p>
              <button>
                <FaRegTrashAlt className="h-6 w-6 text-red-600 hover:text-red-800" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
