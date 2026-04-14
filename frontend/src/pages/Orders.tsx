import { useEffect, useState } from 'react';
import { api } from '../api/axios';
import { Order } from '../types';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders', {
        params: { status, page, limit },
      });
      setOrders(response.data.data);
      setTotal(response.data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">Orders</h2>
            <p className="mt-2 text-sm text-slate-400">Review purchase orders with status filtering.</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr>
                  <th className="border-b border-slate-800 px-4 py-3">Order ID</th>
                  <th className="border-b border-slate-800 px-4 py-3">User</th>
                  <th className="border-b border-slate-800 px-4 py-3">Total</th>
                  <th className="border-b border-slate-800 px-4 py-3">Status</th>
                  <th className="border-b border-slate-800 px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="even:bg-slate-950/80">
                    <td className="border-b border-slate-800 px-4 py-3">{order._id.slice(-6)}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{order.user_id.username}</td>
                    <td className="border-b border-slate-800 px-4 py-3">${order.total_amount}</td>
                    <td className="border-b border-slate-800 px-4 py-3 capitalize">{order.status}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-slate-400">
            <div>{total} orders found</div>
            <Pagination page={page} total={total} limit={limit} onChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
