const OrderManagement = () => {
  const orders = [
    {
      _id: 12232,
      user: {
        name: 'Johan Doe',
      },
      totalPrice: 100,
      status: 'Processing',
    },
  ];

  const handleStatusChange = (orderId, status) => {
    console.log({ id: orderId, status });
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">{order.user.name}</td>
                  <td className="py-3 px-4">${order.totalPrice}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={e =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bule-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </td>
                  <td className="px-3 py-4">
                    <button
                      onChange={() =>
                        handleStatusChange(order._id, 'Delivered')
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-gray-600  cursor-pointer"
                    >
                      Mark As Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 px-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
