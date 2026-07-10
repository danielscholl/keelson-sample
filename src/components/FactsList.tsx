export default function FactsList({ facts }: { facts: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {facts.map((fact, i) => (
        <div key={i} className="p-4 rounded-xl bg-[#0d0d1a] border border-white/5">
          <span className="text-2xl text-indigo-300 font-serif leading-none mr-2">{'"'}</span>
          <p className="text-slate-300 leading-relaxed inline">{fact}</p>
        </div>
      ))}
    </div>
  );
}
