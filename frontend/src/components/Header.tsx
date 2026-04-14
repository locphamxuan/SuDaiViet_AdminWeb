import { Link } from 'react-router-dom';

const Header = () => (
  <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-slate-100">Admin Panel</h1>
      <p className="text-sm text-slate-400">Review users, items, orders and payments in one place.</p>
    </div>
    <div className="flex flex-wrap gap-2">
      <Link
        to="/dashboard"
        className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        Live Stats
      </Link>
      <Link
        to="/users"
        className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
      >
        Manage Users
      </Link>
    </div>
  </div>
);

export default Header;
