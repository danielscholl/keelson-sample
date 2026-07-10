interface CosmicVisualProps {
  slug: string;
  category: string;
  size?: 'sm' | 'lg';
}

export default function CosmicVisual({ slug, category, size = 'sm' }: CosmicVisualProps) {
  const height = size === 'lg' ? 'h-[40vh] min-h-[200px]' : 'h-[120px]';

  return (
    <div className={`relative w-full ${height} overflow-hidden flex items-center justify-center`}>
      <VisualInner slug={slug} category={category} size={size} />
    </div>
  );
}

function VisualInner({ slug, category, size }: { slug: string; category: string; size: 'sm' | 'lg' }) {
  const scale = size === 'lg' ? 1.5 : 1;

  if (slug === 'saturn') {
    return (
      <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
        <div className="w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(ellipse at 35% 35%, #f6e7b0, #c9a84c, #8b6914)' }} />
        <svg className="absolute" width="140" height="60" viewBox="0 0 140 60" fill="none">
          <ellipse cx="70" cy="30" rx="65" ry="12" stroke="#c9a84c" strokeWidth="6" fill="none" opacity="0.7" />
          <ellipse cx="70" cy="30" rx="55" ry="8" stroke="#e8c97a" strokeWidth="3" fill="none" opacity="0.5" />
        </svg>
      </div>
    );
  }

  if (slug === 'sagittarius-a-star') {
    return (
      <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
        <div className="w-24 h-24 rounded-full animate-spin-slow"
          style={{ background: 'conic-gradient(from 0deg, #f87171, #fbbf24, #f87171, #7f1d1d, #f87171)' }} />
        <div className="absolute w-12 h-12 rounded-full bg-[#03030a]" />
      </div>
    );
  }

  if (slug === 'trappist-1') {
    return (
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120, transform: `scale(${scale})` }}>
        <div className="absolute w-6 h-6 rounded-full bg-amber-200/60" />
        {[20, 28, 36, 44, 52, 60, 68].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-slate-600/30"
            style={{ width: r * 2, height: r * 2 }}
          >
            <div
              className="absolute w-2 h-2 rounded-full bg-teal-300"
              style={{
                top: '50%',
                left: '50%',
                marginTop: -4,
                marginLeft: r - 4,
                animation: `orbit ${3 + i * 2}s linear infinite`,
                transformOrigin: `-${r - 4}px 0px`,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (category === 'Nebula') {
    if (slug === 'pillars-of-creation') {
      return (
        <div className="relative flex items-end justify-center gap-2 pb-2" style={{ transform: `scale(${scale})` }}>
          {[
            { h: 90, color: '#92400e', w: 18 },
            { h: 110, color: '#065f46', w: 14 },
            { h: 75, color: '#78350f', w: 16 },
          ].map((p, i) => (
            <div
              key={i}
              className="rounded-t-full opacity-80"
              style={{
                width: p.w,
                height: p.h,
                background: `linear-gradient(to top, ${p.color}, ${p.color}88, transparent)`,
              }}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ transform: `scale(${scale})` }}>
        <div className="absolute w-28 h-28 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, #c084fc, transparent)' }} />
        <div className="absolute w-20 h-20 rounded-full opacity-30 translate-x-4" style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
        <div className="absolute w-16 h-16 rounded-full opacity-30 -translate-x-3 translate-y-2" style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }} />
      </div>
    );
  }

  if (category === 'Galaxy') {
    return (
      <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <ellipse cx="60" cy="40" rx="55" ry="20" fill="none" stroke="#818cf8" strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="60" cy="40" rx="40" ry="14" fill="none" stroke="#a5b4fc" strokeWidth="1" opacity="0.5" />
          <ellipse cx="60" cy="40" rx="22" ry="8" fill="#818cf8" opacity="0.3" />
          <ellipse cx="60" cy="40" rx="8" ry="4" fill="#e0e7ff" opacity="0.7" />
        </svg>
      </div>
    );
  }

  if (category === 'Star') {
    const color = slug === 'betelgeuse' ? '#ef4444' : '#fde68a';
    const glow = slug === 'betelgeuse' ? '#dc2626' : '#fbbf24';
    return (
      <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
        <div
          className={slug === 'betelgeuse' ? 'animate-pulse-slow' : ''}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: `radial-gradient(circle at 40% 35%, ${color}, ${glow}, ${glow}44)`,
            boxShadow: `0 0 30px ${glow}88, 0 0 60px ${glow}44`,
          }}
        />
      </div>
    );
  }

  if (category === 'Moon') {
    const isEuropa = slug === 'europa';
    return (
      <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: isEuropa
              ? 'radial-gradient(circle at 40% 35%, #bfdbfe, #93c5fd, #1e3a5f)'
              : 'radial-gradient(circle at 40% 35%, #fde68a, #d97706, #78350f)',
            boxShadow: isEuropa ? '0 0 20px rgba(147,197,253,0.3)' : '0 0 20px rgba(217,119,6,0.3)',
          }}
        />
        {isEuropa && (
          <svg className="absolute" width="64" height="64" viewBox="0 0 64 64">
            <line x1="15" y1="20" x2="50" y2="45" stroke="#93c5fd" strokeWidth="0.8" opacity="0.6" />
            <line x1="10" y1="35" x2="55" y2="30" stroke="#bfdbfe" strokeWidth="0.6" opacity="0.4" />
            <line x1="25" y1="10" x2="40" y2="55" stroke="#60a5fa" strokeWidth="0.7" opacity="0.5" />
          </svg>
        )}
      </div>
    );
  }

  // Planets
  const planetStyles: Record<string, { bg: string; glow: string }> = {
    jupiter: { bg: 'radial-gradient(ellipse at 40% 35%, #fbbf24, #d97706, #92400e)', glow: 'rgba(217,119,6,0.3)' },
    mars: { bg: 'radial-gradient(circle at 40% 35%, #f87171, #dc2626, #7f1d1d)', glow: 'rgba(220,38,38,0.3)' },
    default: { bg: 'radial-gradient(circle at 40% 35%, #94a3b8, #475569, #1e293b)', glow: 'rgba(148,163,184,0.2)' },
  };
  const ps = planetStyles[slug] ?? planetStyles.default;
  return (
    <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: ps.bg,
          boxShadow: `0 0 20px ${ps.glow}`,
        }}
      />
    </div>
  );
}
