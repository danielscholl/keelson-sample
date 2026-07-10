'use client';
import { useState, useEffect, useCallback } from 'react';
import SearchAndFilter from '@/components/SearchAndFilter';
import CatalogGrid from '@/components/CatalogGrid';

interface ObjectSummary {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  chills: number;
}

export default function ExplorePage() {
  const [allObjects, setAllObjects] = useState<ObjectSummary[]>([]);
  const [filtered, setFiltered] = useState<ObjectSummary[]>([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/objects')
      .then((r) => r.json())
      .then((data) => {
        setAllObjects(data.objects ?? []);
        setFiltered(data.objects ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const applyFilters = useCallback((cat: string, q: string) => {
    setCategory(cat);
    setSearch(q);
    let result = allObjects;
    if (cat) result = result.filter((o) => o.category === cat);
    if (q) result = result.filter((o) => o.name.toLowerCase().includes(q.toLowerCase()));
    setFiltered(result);
  }, [allObjects]);

  const handleClear = () => applyFilters('', '');

  return (
    <div className="min-h-screen pt-20 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif text-white mb-2">The Catalog</h1>
          <p className="text-slate-400">All twelve objects. Filter by category or search by name.</p>
        </div>
        {!loading && (
          <SearchAndFilter
            onFilterChange={applyFilters}
            totalShowing={filtered.length}
            totalAll={allObjects.length}
            searchValue={search}
            categoryValue={category}
          />
        )}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[#0d0d1a] animate-pulse">
                <div className="h-[120px] bg-white/5 rounded-t-xl" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                  <div className="h-4 bg-white/5 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CatalogGrid objects={filtered} onClearFilters={handleClear} />
        )}
      </div>
    </div>
  );
}
