'use client';
import { useState, useCallback } from 'react';

const CATEGORIES = ['All', 'Planet', 'Moon', 'Star', 'Nebula', 'Galaxy', 'Black Hole', 'Exoplanet System'];

interface SearchAndFilterProps {
  onFilterChange: (category: string, search: string) => void;
  totalShowing: number;
  totalAll: number;
  searchValue: string;
  categoryValue: string;
}

export default function SearchAndFilter({
  onFilterChange,
  totalShowing,
  totalAll,
  searchValue,
  categoryValue,
}: SearchAndFilterProps) {
  const [searchInput, setSearchInput] = useState(searchValue);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((value: string) => {
    setSearchInput(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      onFilterChange(categoryValue, value);
    }, 300);
    setDebounceTimer(timer);
  }, [categoryValue, onFilterChange, debounceTimer]);

  const handleCategory = (cat: string) => {
    const normalized = cat === 'All' ? '' : cat;
    onFilterChange(normalized, searchInput);
  };

  const CATEGORY_ACTIVE: Record<string, string> = {
    'Planet': 'bg-amber-900 text-amber-400',
    'Moon': 'bg-slate-700 text-slate-300',
    'Star': 'bg-amber-900 text-yellow-200',
    'Nebula': 'bg-purple-900 text-purple-300',
    'Galaxy': 'bg-indigo-900 text-indigo-300',
    'Black Hole': 'bg-red-950 text-red-400',
    'Exoplanet System': 'bg-teal-950 text-teal-300',
    'All': 'bg-white/10 text-white',
  };

  return (
    <div className="sticky top-16 z-40 bg-[#03030a]/90 backdrop-blur-sm pb-4 pt-2">
      <input
        type="text"
        placeholder="Search by name…"
        value={searchInput}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2.5 rounded-lg bg-[#0d0d1a] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
      />
      <div className="flex flex-wrap gap-2 mb-3">
        {CATEGORIES.map((cat) => {
          const isActive = cat === 'All' ? categoryValue === '' : categoryValue === cat;
          const activeStyle = CATEGORY_ACTIVE[cat] ?? 'bg-white/10 text-white';
          return (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-colors ${
                isActive ? activeStyle : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-slate-500">
        {searchValue
          ? `${totalShowing} result${totalShowing !== 1 ? 's' : ''} for "${searchValue}"`
          : `Showing ${totalShowing} of ${totalAll} objects`}
      </p>
    </div>
  );
}
