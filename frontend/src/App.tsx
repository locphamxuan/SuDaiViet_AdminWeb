import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Items from './pages/Items';
import Orders from './pages/Orders';
import Payments from './pages/Payments';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <Header />
          <main className="mt-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/items" element={<Items />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payments" element={<Payments />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
