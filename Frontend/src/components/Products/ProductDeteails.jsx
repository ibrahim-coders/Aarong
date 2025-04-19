import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from '../../Redux/slice/productsSlice';
import { addToCart } from '../../Redux/slice/cartSlice';
import Loading from '../Common/Loading';
import ProductGrid from './ProductGrid';

const ProductDetails = ({ productId }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    state => state.products
  );
  const { user, guestId } = useSelector(state => state.auth);

  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct?.images[0]?.url);
    }
  }, [selectedProduct]);

  const handleAddCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color before adding to cart', {
        duration: 1000,
      });
      return;
    }

    setButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success('Product added to cart!', { duration: 1000 });
      })
      .finally(() => {
        setButtonDisabled(false);
      });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  console.log(selectedProduct);
  return (
    <div className="mt-10 px-6">
      {similarProducts && (
        <>
          <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
          <div className="max-w-6xl mx-auto bg-white rounded-lg p-6">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar Thumbnails */}
              <div className="hidden md:flex flex-col space-y-4 mr-6">
                {selectedProduct?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt="Product Thumbnail"
                    className="w-20 h-20 object-cover rounded-md cursor-pointer border"
                    onClick={() => setMainImage(image?.url)}
                  />
                ))}
              </div>

              {/* Main Product Image */}
              <div className="md:w-1/2 mb-4 h-[550px]">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full  h-full object-center rounded-lg"
                />
              </div>

              {/* Mobile Thumbnails */}
              <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
                {selectedProduct?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt="Product Thumbnail"
                    className="w-20 h-20 object-cover rounded-md cursor-pointer border"
                    onClick={() => setMainImage(image?.url)}
                  />
                ))}
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 md:ml-10">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                  {selectedProduct?.name}
                </h1>
                <p className="text-lg text-gray-500 mb-1 line-through">
                  ${selectedProduct?.price}
                </p>
                <p className="text-xl text-gray-800 font-bold mb-2">
                  ${selectedProduct?.discountPrice}
                </p>
                <p className="text-gray-600 mb-4">
                  {selectedProduct?.description}
                </p>

                <div className="flex gap-4 flex-wrap">
                  {/* Colors */}
                  <div className="mb-4">
                    <p className="text-gray-700 mb-2">Color:</p>
                    <div className="flex gap-2">
                      {selectedProduct?.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border cursor-pointer ${
                            selectedColor === color
                              ? 'border-4 border-black'
                              : 'border-gray-600'
                          }`}
                          style={{
                            backgroundColor: color.toLowerCase(),
                            filter: 'brightness(0.8)',
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-4">
                    <p className="text-gray-700 mb-2">Size:</p>
                    <div className="flex gap-2">
                      {selectedProduct?.sizes.map(size => (
                        <button
                          onClick={() => setSelectedSize(size)}
                          key={size}
                          className={`px-4 py-2 rounded border transition cursor-pointer ${
                            selectedSize === size
                              ? 'bg-gray-500 text-white'
                              : ''
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <p className="text-gray-700">Quantity:</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-4 py-1 bg-gray-200 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-4 py-1 bg-gray-200 rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddCart}
                  disabled={isButtonDisabled}
                  className={`px-6 py-3 bg-orange-600 text-white font-bold rounded-md transition cursor-pointer ${
                    isButtonDisabled
                      ? 'cursor-not-allowed'
                      : 'hover:bg-orange-700'
                  }`}
                >
                  {isButtonDisabled ? 'Adding to Cart...' : 'Add to Cart'}
                </button>

                {/* Characteristics */}
                <div className="mt-6 text-gray-700">
                  <h3 className="text-xl font-black mb-4">Characteristics:</h3>
                  <table className="w-full text-left text-sm text-gray-700">
                    <tbody>
                      <tr>
                        <td className="py-1">Brand</td>
                        <td className="py-1">{selectedProduct?.brand}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Material</td>
                        <td className="py-1">{selectedProduct?.material}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center">You May Also Like</h2>
        <ProductGrid
          products={similarProducts}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
