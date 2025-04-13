import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductManagnent = () => {
  const products = [
    {
      _id: 1,
      name: 'Shirt',
      price: 110,
      sku: '12334',
    },
  ];
  const handleProductDelete = id => {
    console.log(id);
  };
  return (
    <div className="mx-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Managnent</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr className="">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {products.length > 0 ? (
              products.map(product => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-100  cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="flex p-4 space-x-4">
                    <Link to={`/admin/products/${product._id}/edit`}>
                      <FaEdit className="text-green-500 cursor-pointer" />
                    </Link>

                    <button onClick={() => handleProductDelete(product._id)}>
                      <FaTrash className="text-red-500 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr colSpan={4} className="">
                Products Not Found
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagnent;
