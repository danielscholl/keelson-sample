import Link from 'next/link';
import ObjectOfTheDayCard from '@/components/ObjectOfTheDayCard';
import HeroSection from '@/components/HeroSection';

export default async function HomePage() {
  const { getObjectOfTheDay, getAdjacentSlugs } = await import('@/lib/db');
  let object = null;
  let error = false;
  try {
    const obj = getObjectOfTheDay();
    if (obj) {
      const { prevSlug, nextSlug } = getAdjacentSlugs(obj.sort_order);
      object = {
        ...obj,
        stats: JSON.parse(obj.stats),
        facts: JSON.parse(obj.facts),
        prevSlug,
        nextSlug,
      };
    }
  } catch {
    error = true;
  }

  return (
    <div className="min-h-screen pt-16">
      <HeroSection />
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] text-center mb-8">Today&apos;s Object</p>
          <ObjectOfTheDayCard object={object} error={error} />
          <div className="mt-12 text-center">
            <Link
              href="/explore"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              See the full catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
