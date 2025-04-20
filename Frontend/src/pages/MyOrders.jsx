import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../Redux/slice/orderSlice';

import Loading from '../components/Common/Loading';

const MyOrders = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  // const handleRowClick=(orderId)=>{
  //   navigate(`/order/${orderId}`)
  // }
  if (loading) return <Loading></Loading>;
  if (error) return <p>ERROR :{error}</p>;
  console.log(orders);
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
