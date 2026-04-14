import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/items', label: 'Items' },
  { to: '/orders', label: 'Orders' },
  { to: '/payments', label: 'Payments' },
];

const Sidebar = () => (
  <aside className="w-72 border-r border-slate-800 bg-slate-900 p-5 text-slate-200">
    <div className="mb-8 text-center">
      <div className="mb-2 text-2xl font-semibold text-emerald-300">Game Admin</div>
      <div className="text-sm text-slate-400">Local Dashboard</div>
    </div>
    <nav className="space-y-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
