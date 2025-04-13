import { Link } from 'react-router-dom';
import womanCollection from '../../assets/banner/women-collaction.jpg';
import menCollection from '../../assets/banner/men-colleaction.jpg';

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1 group overflow-hidden">
          <img
            src={womanCollection}
            alt="Women's Collection"
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105 cursor-move"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded shadow">
            <h2 className="text-2xl font-bold text-gray-700 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collection/women"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 group overflow-hidden">
          <img
            src={menCollection}
            alt="Men's Collection"
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105 cursor-move "
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded shadow">
            <h2 className="text-2xl font-bold text-gray-700 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collection/men"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
