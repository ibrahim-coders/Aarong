import { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturedSeaction from '../components/Products/FeaturedSeaction';
import GenderCollection from '../components/Products/GenderCollection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductGrid from '../components/Products/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetails from '../components/Products/ProductDeteails'; // Assuming this is the correct path
import Loading from '../components/Common/Loading';
import axios from 'axios';
import { fetchProductsByFilters } from '../Redux/slice/productsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: 'Women',
        category: 'Bottom Wear',
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch best seller:', error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);
  console.log(bestSellerProduct);
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      <div className="mt-10">
        <header className="px-4">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          {/* {bestSellerProduct ? (
            <ProductDetails productId={bestSellerProduct._id} />
          ) : (
            <Loading />
          )} */}

          <p className="mt-4 max-w-md text-gray-500">
            Product collections can reflect product categories or groups used in
            the user’s online store or be based on other filters, such as price
            or metadata. Similar to customer segments, product collections can
            be either static
          </p>
        </header>

        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturedSeaction />
    </div>
  );
};

export default Home;
