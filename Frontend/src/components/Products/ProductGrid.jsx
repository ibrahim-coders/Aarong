import { Link } from 'react-router-dom';
import Loading from '../Common/Loading';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className="px-2 py-8 sm:px-2 sm:py-12 lg:px-4">
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <li key={index}>
              <Link
                to={`/product/${product._id}`}
                className="group block overflow-hidden"
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  loading="lazy" // ✅ improves performance
                  className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />

                <div className="relative bg-white pt-3">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.name}
                  </h3>

                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>
                    <span className="tracking-wider text-gray-900">
                      ${product.price}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductGrid;
