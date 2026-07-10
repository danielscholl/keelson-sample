interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Planet': 'bg-amber-900/60 text-amber-400',
  'Moon': 'bg-slate-800/60 text-slate-300',
  'Star': 'bg-amber-900/60 text-yellow-200',
  'Nebula': 'bg-purple-900/60 text-purple-300',
  'Galaxy': 'bg-indigo-900/60 text-indigo-300',
  'Black Hole': 'bg-red-950/60 text-red-400',
  'Exoplanet System': 'bg-teal-950/60 text-teal-300',
};

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const style = CATEGORY_STYLES[category] ?? 'bg-slate-800/60 text-slate-300';
  return (
    <span className={`inline-block font-mono text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded ${style} ${className}`}>
      {category}
    </span>
  );
}
