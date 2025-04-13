import MyOrders from './MyOrders';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row container mx-auto p-4">
        {/* Left section: User Profile */}
        <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 mb-6 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">John Doe</h1>
          <p className="text-lg text-gray-700 mb-4">Johan@exmpole.com</p>
          <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            Logout
          </button>
        </div>

        {/* Orders Section */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <MyOrders />
        </div>
      </div>
    </div>
  );
};

export default Profile;
