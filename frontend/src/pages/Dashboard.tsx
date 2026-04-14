import { useEffect, useState } from 'react';
import { api } from '../api/axios';
import Loader from '../components/Loader';

interface Stats {
  totalRevenue: number;
  orderCount: number;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  bannedUsers: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [revenueRes, usersRes] = await Promise.all([
          api.get('/stats/revenue'),
          api.get('/stats/users'),
        ]);
        setStats({
          totalRevenue: revenueRes.data.totalRevenue,
          orderCount: revenueRes.data.orderCount,
          totalUsers: usersRes.data.totalUsers,
          activeUsers: usersRes.data.activeUsers,
          inactiveUsers: usersRes.data.inactiveUsers,
          bannedUsers: usersRes.data.bannedUsers,
        });
      } catch (err) {
        setError('Unable to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="text-sm uppercase tracking-[0.16em] text-slate-400">Revenue</div>
          <div className="mt-4 text-3xl font-semibold text-emerald-300">${stats?.totalRevenue.toLocaleString()}</div>
          <div className="mt-2 text-sm text-slate-400">Completed order income</div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="text-sm uppercase tracking-[0.16em] text-slate-400">Users</div>
          <div className="mt-4 text-3xl font-semibold text-slate-300">{stats?.totalUsers}</div>
          <div className="mt-2 text-sm text-slate-400">Total registered players</div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="text-sm uppercase tracking-[0.16em] text-slate-400">Orders</div>
          <div className="mt-4 text-3xl font-semibold text-slate-300">{stats?.orderCount}</div>
          <div className="mt-2 text-sm text-slate-400">Completed orders</div>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-600 bg-red-500/10 p-4 text-red-100">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="text-sm uppercase tracking-[0.16em] text-slate-400">Active</div>
            <div className="mt-3 text-3xl font-semibold text-emerald-300">{stats?.activeUsers}</div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="text-sm uppercase tracking-[0.16em] text-slate-400">Inactive</div>
            <div className="mt-3 text-3xl font-semibold text-slate-300">{stats?.inactiveUsers}</div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="text-sm uppercase tracking-[0.16em] text-slate-400">Banned</div>
            <div className="mt-3 text-3xl font-semibold text-rose-400">{stats?.bannedUsers}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
