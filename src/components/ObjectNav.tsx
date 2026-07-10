import Link from 'next/link';

interface ObjectNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
  prevName?: string;
  nextName?: string;
}

export default function ObjectNav({ prevSlug, nextSlug, prevName, nextName }: ObjectNavProps) {
  return (
    <div className="flex items-center justify-between pt-8 border-t border-white/5">
      {prevSlug ? (
        <Link href={`/object/${prevSlug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm">{prevName ?? prevSlug}</span>
        </Link>
      ) : <div />}
      {nextSlug ? (
        <Link href={`/object/${nextSlug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <span className="text-sm">{nextName ?? nextSlug}</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      ) : <div />}
    </div>
  );
}
