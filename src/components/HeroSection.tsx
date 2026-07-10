export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4 animate-fade-in">
      <h1 className="text-6xl md:text-8xl font-mono font-bold tracking-[0.4em] text-white mb-4">
        COSMOS
      </h1>
      <p className="text-xl md:text-2xl text-slate-300 font-serif mb-3">
        The universe, twelve objects at a time.
      </p>
      <p className="text-slate-400 max-w-lg leading-relaxed">
        An explorer for the most remarkable objects in the cosmos.
        Planets. Moons. Stars. Nebulae. Galaxies. The abyss itself.
      </p>
    </div>
  );
}
