interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, total, limit, onChange }: PaginationProps) => {
  const pages = Math.max(1, Math.ceil(total / limit));
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onChange(pageNumber)}
          className={`rounded-xl px-3 py-2 transition ${
            pageNumber === page ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
