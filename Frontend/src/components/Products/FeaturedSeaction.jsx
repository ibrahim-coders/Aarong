import {
  FaShippingFast,
  FaHeadset,
  FaDollarSign,
  FaShoppingCart,
} from 'react-icons/fa';

const FeaturedSection = () => {
  return (
    <div className=" py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Shop With Us?
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Enjoy exclusive benefits and top-notch service.
        </p>

        {/* Feature Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature Item 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShippingFast className="text-orange-500 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold">Fast Shipping</h3>
            <p className="text-gray-600 mt-2">
              Get your products quickly with our express delivery.
            </p>
          </div>

          {/* Feature Item 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaHeadset className="text-blue-500 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold">24/7 Support</h3>
            <p className="text-gray-600 mt-2">
              We're here for you anytime, anywhere.
            </p>
          </div>

          {/* Feature Item 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaDollarSign className="text-green-500 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold">Best Prices</h3>
            <p className="text-gray-600 mt-2">
              Enjoy competitive pricing on all products.
            </p>
          </div>

          {/* Feature Item 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShoppingCart className="text-purple-500 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold">Easy Checkout</h3>
            <p className="text-gray-600 mt-2">
              Seamless and secure payment process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
