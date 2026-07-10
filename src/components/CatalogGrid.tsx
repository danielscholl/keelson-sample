import ObjectCard from './ObjectCard';

interface ObjectSummary {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  chills: number;
}

interface CatalogGridProps {
  objects: ObjectSummary[];
  onClearFilters?: () => void;
}

export default function CatalogGrid({ objects, onClearFilters }: CatalogGridProps) {
  if (objects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-2xl font-serif text-white mb-2">Nothing out here.</p>
        <p className="text-slate-400 mb-6">Try a different category or clear your search.</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {objects.map((obj) => (
        <ObjectCard key={obj.slug} {...obj} />
      ))}
    </div>
  );
}
