import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api/axios';
import { Item } from '../types';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [rarity, setRarity] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/items', {
        params: { search, category, rarity, page, limit },
      });
      setItems(response.data.data);
      setTotal(response.data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search, category, rarity, page]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-xl font-semibold text-slate-100">Items</h2>
        <p className="mt-2 text-sm text-slate-400">Search and filter in-game items.</p>

        <form onSubmit={handleSearch} className="mt-6 grid gap-3 sm:grid-cols-4">
          <label className="space-y-2 text-sm text-slate-300">
            Search
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              placeholder="Fire Sword"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Category
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              placeholder="weapon"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Rarity
            <select
              value={rarity}
              onChange={(e) => setRarity(e.target.value)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
            >
              <option value="">All</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Apply
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
                  <th className="border-b border-slate-800 px-4 py-3">Name</th>
                  <th className="border-b border-slate-800 px-4 py-3">Category</th>
                  <th className="border-b border-slate-800 px-4 py-3">Rarity</th>
                  <th className="border-b border-slate-800 px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="even:bg-slate-950/80">
                    <td className="border-b border-slate-800 px-4 py-3 text-slate-100">{item.name}</td>
                    <td className="border-b border-slate-800 px-4 py-3">{item.category}</td>
                    <td className="border-b border-slate-800 px-4 py-3 capitalize">{item.rarity}</td>
                    <td className="border-b border-slate-800 px-4 py-3">${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-slate-400">
            <div>{total} items found</div>
            <Pagination page={page} total={total} limit={limit} onChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
