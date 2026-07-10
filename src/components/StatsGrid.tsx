interface Stat {
  label: string;
  value: string;
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-1 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-0.5 p-3 rounded-lg bg-white/5 border border-white/5">
          <dt className="text-xs font-mono text-slate-400 uppercase tracking-wider">{stat.label}</dt>
          <dd className="text-white font-semibold">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
