import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import CosmicVisual from './CosmicVisual';

interface ObjectCardProps {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  chills: number;
}

export default function ObjectCard({ slug, name, category, tagline, chills }: ObjectCardProps) {
  return (
    <Link href={`/object/${slug}`} className="group block rounded-xl overflow-hidden border border-white/5 bg-[#0d0d1a] hover:border-white/20 hover:scale-[1.02] transition-all duration-200">
      <CosmicVisual slug={slug} category={category} size="sm" />
      <div className="p-4">
        <CategoryBadge category={category} className="mb-2" />
        <h3 className="text-white font-semibold text-base mb-1 group-hover:text-indigo-200 transition-colors">{name}</h3>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{tagline}</p>
        {chills > 0 && (
          <p className="mt-2 text-xs text-slate-500">✦ {chills} chills</p>
        )}
      </div>
    </Link>
  );
}
