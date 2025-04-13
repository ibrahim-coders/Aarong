import Hero from '../components/Layout/Hero';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturedSeaction from '../components/Products/FeaturedSeaction';
import GenderCollection from '../components/Products/GenderCollection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDeteails from '../components/Products/ProductDeteails';
import ProductGrid from '../components/Products/ProductGrid';
const similarProducts = [
  {
    _id: 1,
    name: 'Casual Shirt',
    price: 100,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    _id: 2,
    name: 'Denim Jacket',
    price: 150,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    _id: 3,
    name: 'Hoodie',
    price: 90,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    _id: 4,
    name: 'Hoodie',
    price: 90,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    _id: 4,
    name: 'Hoodie',
    price: 90,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    _id: 4,
    name: 'Hoodie',
    price: 90,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    _id: 4,
    name: 'Hoodie',
    price: 90,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    _id: 4,
    name: 'Hoodie',
    price: 90,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
];
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* best seller */}

      <ProductDeteails />
      <div className="mt-10">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>
        <ProductGrid products={similarProducts} />
      </div>
      <FeaturedCollection />
      <FeaturedSeaction />
    </div>
  );
};

export default Home;
