import { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidbar from '../components/Products/FilterSidbar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = e => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const similarProducts = [
        {
          _id: 1,
          name: 'Casual Shirt',
          price: 100,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
        {
          _id: 2,
          name: 'Denim Jacket',
          price: 150,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
        {
          _id: 3,
          name: 'Hoodie',
          price: 90,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
        {
          _id: 4,
          name: 'T-Shirt',
          price: 50,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
        {
          _id: 5,
          name: 'T-Shirt',
          price: 50,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
        {
          _id: 6,
          name: 'T-Shirt',
          price: 50,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
        {
          _id: 7,
          name: 'T-Shirt',
          price: 50,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
        {
          _id: 8,
          name: 'T-Shirt',
          price: 50,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1770&q=80',
            },
          ],
        },
      ];
      setProducts(similarProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center cursor-pointer"
      >
        <FaFilter className="mr-2" /> Filter
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-50 left-0 w-64 md:w-[450px] bg-white transition-transform duration-300 md:translate-x-0 lg:static `}
      >
        <FilterSidbar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        <SortOptions />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
