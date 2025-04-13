import { useEffect, useState } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: '1',
          createdAt: new Date(),
          shippingAddress: {
            city: 'Dhaka',
            country: 'BD',
            orderItems: [
              {
                name: 'product 1',
                image:
                  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
              },
            ],
            totalPrice: 230,
            isPaid: true,
          },
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Created</th>
                <th className="px-4 py-2 text-left">Shipping Address</th>
                <th className="px-4 py-2 text-left">Items</th>
                <th className="px-4 py-2 text-left">Total Price</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <img
                        src={order.shippingAddress.orderItems[0].image}
                        alt={order.shippingAddress.orderItems[0].name}
                        className="w-12 h-12 object-cover rounded-full mr-2"
                      />
                      {order.shippingAddress.orderItems[0].name}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.country}
                  </td>
                  <td className="px-4 py-2">
                    {order.shippingAddress.orderItems.length} items
                  </td>
                  <td className="px-4 py-2">
                    ${order.shippingAddress.totalPrice}
                  </td>
                  <td className="px-4 py-2">
                    {order.shippingAddress.isPaid ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <span className="text-red-500">Unpaid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
