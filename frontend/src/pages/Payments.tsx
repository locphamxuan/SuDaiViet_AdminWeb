import { useEffect, useState } from 'react';
import { api } from '../api/axios';
import { Payment } from '../types';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/payments', {
        params: { status, page, limit },
      });
      setPayments(response.data.data);
      setTotal(response.data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [status, page]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">Payments</h2>
            <p className="mt-2 text-sm text-slate-400">Track payment records by provider and status.</p>
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
              <option value="failed">Failed</option>
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
                  <th className="border-b border-slate-800 px-4 py-3">Payment ID</th>
                  <th className="border-b border-slate-800 px-4 py-3">User</th>
                  <th className="border-b border-slate-800 px-4 py-3">Amount</th>
                  <th className="border-b border-slate-800 px-4 py-3">Provider</th>
                  <th className="border-b border-slate-800 px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="even:bg-slate-950/80">
                    <td className="border-b border-slate-800 px-4 py-3">{payment._id.slice(-6)}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{payment.user_id.username}</td>
                    <td className="border-b border-slate-800 px-4 py-3">${payment.amount}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{payment.provider}</td>
                    <td className="border-b border-slate-800 px-4 py-3 capitalize">{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-slate-400">
            <div>{total} payments found</div>
            <Pagination page={page} total={total} limit={limit} onChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
