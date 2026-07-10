import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-mono text-slate-700 mb-4">404</p>
      <h1 className="text-2xl font-serif text-white mb-2">Object Not Found</h1>
      <p className="text-slate-400 mb-6">That object doesn&apos;t exist in this catalog. Maybe it&apos;s still forming.</p>
      <Link href="/explore" className="text-indigo-300 hover:text-white transition-colors">
        ← Back to Catalog
      </Link>
    </div>
  );
}
