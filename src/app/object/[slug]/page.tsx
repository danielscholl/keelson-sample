import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getObjectBySlug, getAdjacentSlugs } from '@/lib/db';
import CategoryBadge from '@/components/CategoryBadge';
import CosmicVisual from '@/components/CosmicVisual';
import StatsGrid from '@/components/StatsGrid';
import FactsList from '@/components/FactsList';
import ChillsButton from '@/components/ChillsButton';
import ObjectNav from '@/components/ObjectNav';

export async function generateStaticParams() {
  return [
    'the-sun','jupiter','saturn','mars','europa','titan',
    'betelgeuse','sagittarius-a-star','orion-nebula',
    'pillars-of-creation','andromeda-galaxy','trappist-1',
  ].map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

export default function ObjectDetailPage({ params }: PageProps) {
  const obj = getObjectBySlug(params.slug);
  if (!obj) notFound();

  const { prevSlug, nextSlug } = getAdjacentSlugs(obj.sort_order);
  const stats = JSON.parse(obj.stats) as Array<{ label: string; value: string }>;
  const facts = JSON.parse(obj.facts) as string[];

  // Get prev/next names for nav
  const prevObj = prevSlug ? getObjectBySlug(prevSlug) : null;
  const nextObj = nextSlug ? getObjectBySlug(nextSlug) : null;

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Link href="/explore" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm py-4 mt-4 mb-2">
          ← Back to Catalog
        </Link>

        <div className="rounded-2xl overflow-hidden border border-white/5 mb-8">
          <CosmicVisual slug={obj.slug} category={obj.category} size="lg" />
        </div>

        <div className="mb-6">
          <CategoryBadge category={obj.category} className="mb-3" />
          <h1 className="text-5xl font-serif text-white mb-2">{obj.name}</h1>
          <p className="text-xl text-slate-300 italic">{obj.tagline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">About</h2>
            <p className="text-slate-300 leading-relaxed">{obj.description}</p>
          </div>
          <div>
            <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Key Stats</h2>
            <StatsGrid stats={stats} />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Did You Know?</h2>
          <FactsList facts={facts} />
        </div>

        <div className="mb-10 py-8 border-y border-white/5 flex flex-col items-center">
          <ChillsButton slug={obj.slug} initialChills={obj.chills} />
        </div>

        <ObjectNav
          prevSlug={prevSlug}
          nextSlug={nextSlug}
          prevName={prevObj?.name}
          nextName={nextObj?.name}
        />
      </div>
    </div>
  );
}
