import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api/axios';
import { User } from '../types';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const statuses = ['', 'active', 'inactive', 'banned'];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users', {
        params: { search, status, page, limit },
      });
      setUsers(response.data.data);
      setTotal(response.data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, status, page]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-xl font-semibold text-slate-100">Users</h2>
        <p className="mt-2 text-sm text-slate-400">Search, filter and paginate active player accounts.</p>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Search name
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
                placeholder="dragonMaster"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              >
                {statuses.map((option) => (
                  <option key={option} value={option}>
                    {option || 'All'}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr>
                  <th className="border-b border-slate-800 px-4 py-3">Username</th>
                  <th className="border-b border-slate-800 px-4 py-3">Account</th>
                  <th className="border-b border-slate-800 px-4 py-3">Level</th>
                  <th className="border-b border-slate-800 px-4 py-3">Status</th>
                  <th className="border-b border-slate-800 px-4 py-3">Total Spend</th>
                  <th className="border-b border-slate-800 px-4 py-3">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="even:bg-slate-950/80">
                    <td className="border-b border-slate-800 px-4 py-3 text-slate-100">{user.username}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{user.game_account}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{user.level}</td>
                    <td className="border-b border-slate-800 px-4 py-3 capitalize">{user.status}</td>
                    <td className="border-b border-slate-800 px-4 py-3">${user.total_spending}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{new Date(user.last_login).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-slate-400">
            <div>{total} users found</div>
            <Pagination page={page} total={total} limit={limit} onChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
