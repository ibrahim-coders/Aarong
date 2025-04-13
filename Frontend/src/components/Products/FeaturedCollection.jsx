import featureDCollection from '../../assets/shoppers.jpg';

const FeaturedCollection = () => {
  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Text Content Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Discover the Latest Trends!
          </h1>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Explore our exclusive collection featuring the latest fashion
            trends. Get ready to elevate your style with unique and stylish
            pieces tailored just for you.
          </p>
          <button className="mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700 transition">
            Explore Now
          </button>
        </div>
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={featureDCollection}
            alt="Featured Collection"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollection;
