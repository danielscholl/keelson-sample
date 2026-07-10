'use client';
import { useState, useEffect } from 'react';

interface ChillsButtonProps {
  slug: string;
  initialChills: number;
}

export default function ChillsButton({ slug, initialChills }: ChillsButtonProps) {
  const [chills, setChills] = useState(initialChills);
  const [hasReacted, setHasReacted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`chills-${slug}`);
    if (stored === '1') setHasReacted(true);
  }, [slug]);

  const handleClick = async () => {
    if (hasReacted || loading) return;
    setLoading(true);
    // Optimistic update
    setChills((c) => c + 1);
    setHasReacted(true);
    localStorage.setItem(`chills-${slug}`, '1');

    try {
      const res = await fetch(`/api/reactions/${slug}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setChills(data.chills);
        if (data.alreadyReacted) {
          // Server says already reacted — still show reacted state (localStorage was already set)
        }
      }
    } catch {
      // Keep optimistic update on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-mono text-slate-400 tracking-wider uppercase">Did this give you chills?</p>
      <button
        onClick={handleClick}
        disabled={hasReacted || loading}
        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          hasReacted
            ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-500/40 cursor-default'
            : 'bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/40 active:scale-95'
        }`}
      >
        {hasReacted ? '✓ You felt it' : '✦ Give it chills'}
      </button>
      <p className="text-slate-400 text-sm">{chills} {chills === 1 ? 'person' : 'people'} got chills</p>
      {hasReacted && (
        <p className="text-xs text-slate-500">You&apos;ve already given this chills today.</p>
      )}
    </div>
  );
}
