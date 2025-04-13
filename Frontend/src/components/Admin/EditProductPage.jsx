import { useState } from 'react';

const EditProductPage = () => {
  const [productData, setproductData] = useState({
    name: '',
    description: '',
    price: '',
    countInStock: '',
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collection: '',
    meterial: '',
    gender: '',
    images: [
      {
        url: 'https://picsum.photos.150?rendom=1',
      },
      {
        url: 'https://picsum.photos.150?rendom=2',
      },
    ],
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setproductData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async e => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleUpdate = e => {
    e.preventDefault();
    // console.log('Updated Product:', formData);
    // onUpdate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form
        onSubmit={handleUpdate}
        className="space-y-4 w-full md:max-w-2xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-2">
          {/* Product Name */}
          <div className="mb-2 w-full md:w-1/2">
            <label className="block text-gray-600">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full p-2 border border-gray-500 rounded"
              required
            />
          </div>
          {/* SKU */}
          <div className="mb-2 w-full md:w-1/2">
            <label className="block text-gray-600">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
              className="w-full p-2 border border-gray-500 rounded"
              required
            />
          </div>
        </div>
        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-gray-600">Price ($)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Count in Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Size Selection */}
          <div>
            <label className="block text-gray-600">
              Size (Comma-Separated)
            </label>
            <input
              type="text"
              name="size"
              value={productData.sizes.join(',')}
              onChange={e =>
                setproductData({
                  ...productData,
                  sizes: e.target.value.split(',').map(size => size.trim()),
                })
              }
              className="w-full p-2 border border-gray-500 rounded"
              required
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-gray-600">
              Colors (Comma-Separated)
            </label>
            <input
              type="text"
              name="size"
              value={productData.colors.join(',')}
              onChange={e =>
                setproductData({
                  ...productData,
                  colors: e.target.value.split(',').map(color => color.trim()),
                })
              }
              className="w-full p-2 border border-gray-500 rounded"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="w-full md:w-1/2">
          <label className="block text-gray-600">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-500 rounded"
          />
          <div className="flex gap-2 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image.url}
                  alt="producat images"
                  className="w-20 h-20 shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-2">
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full p-2 border border-gray-500 rounded"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
