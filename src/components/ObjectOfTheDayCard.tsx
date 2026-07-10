import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import CosmicVisual from './CosmicVisual';

interface TodayObject {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  chills: number;
  stats?: Array<{ label: string; value: string }>;
  facts?: string[];
  prevSlug?: string | null;
  nextSlug?: string | null;
}

interface Props {
  object: TodayObject | null;
  error?: boolean;
}

export default function ObjectOfTheDayCard({ object, error }: Props) {
  if (error) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#0d0d1a] p-8 text-center">
        <p className="text-slate-400">The cosmos is unreachable right now. Try refreshing.</p>
      </div>
    );
  }

  if (!object) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#0d0d1a] animate-pulse">
        <div className="h-[200px] bg-white/5 rounded-t-2xl" />
        <div className="p-6 space-y-3">
          <div className="h-4 bg-white/5 rounded w-1/4" />
          <div className="h-6 bg-white/5 rounded w-1/2" />
          <div className="h-4 bg-white/5 rounded w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#0d0d1a] overflow-hidden">
      <CosmicVisual slug={object.slug} category={object.category} size="lg" />
      <div className="p-6">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Today&apos;s featured object</p>
        <CategoryBadge category={object.category} className="mb-3" />
        <h2 className="text-3xl font-serif text-white mb-2">{object.name}</h2>
        <p className="text-slate-300 mb-2 italic">{object.tagline}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{object.description}</p>
        <Link
          href={`/object/${object.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all text-sm font-semibold"
        >
          Explore {object.name} →
        </Link>
      </div>
    </div>
  );
}
