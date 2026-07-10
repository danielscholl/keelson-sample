import Link from 'next/link';

export default function CosmosNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/5">
      <Link href="/" className="text-xl font-mono font-bold tracking-[0.3em] text-white hover:text-indigo-300 transition-colors">
        COSMOS
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/explore" className="text-sm text-slate-300 hover:text-white transition-colors">
          Explore →
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] animate-pulse-slow" />
          Today&apos;s Object
        </Link>
      </div>
    </nav>
  );
}
