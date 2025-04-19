import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useState, useRef } from 'react';
import Glide from '@glidejs/glide';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const glideRef = useRef(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    if (newArrivals.length > 0 && glideRef.current) {
      const slider = new Glide(glideRef.current, {
        type: 'carousel',
        focusAt: 'center',
        perView: 3,
        autoplay: 3000,
        animationDuration: 700,
        gap: 24,
        breakpoints: {
          1024: { perView: 2 },
          640: { perView: 1 },
        },
      });

      slider.mount();

      return () => {
        slider.destroy();
      };
    }
  }, [newArrivals]);

  return (
    <div ref={glideRef} className="glide-01 relative w-full">
      {/* Section Heading */}
      <div className="container mx-auto text-center py-10">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-6">
          Discover your styles straight off the runway, freshly added to keep
          your wardrobe on the cutting edge of fashion.
        </p>
      </div>

      {/* Slides */}
      <div className="overflow-hidden" data-glide-el="track">
        <ul className="relative flex w-full overflow-hidden p-0">
          {newArrivals.map(product => (
            <li key={product._id} className="relative mx-2">
              <div className="h-[500px] items-center">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name || 'No name'}
                  className="w-full h-full object-contain    rounded-md"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">${product.price}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Controls */}
      <div
        className="absolute left-0 mt-20 md:top-[70px] flex w-full items-center justify-end px-4 space-x-4 md:mt-10"
        data-glide-el="controls"
      >
        <button
          className="h-12 w-12 flex items-center justify-center rounded-md border bg-white shadow-md text-gray-700 hover:bg-gray-100"
          data-glide-dir="<"
        >
          <FiChevronLeft className="text-2xl cursor-pointer" />
        </button>
        <button
          className="h-12 w-12 flex items-center justify-center rounded-md border bg-white shadow-md text-gray-700 hover:bg-gray-100"
          data-glide-dir=">"
        >
          <FiChevronRight className="text-2xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
