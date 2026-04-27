import type { PokemonStat } from "@/lib/pokemon";

type PokemonStatBarProps = {
  stat: PokemonStat;
};

export function PokemonStatBar({ stat }: PokemonStatBarProps) {
  const percentage = Math.min(Math.round((stat.value / 180) * 100), 100);

  return (
    <div className="grid gap-2 sm:grid-cols-[160px_80px_1fr] sm:items-center">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-300">
        {stat.label}
      </p>
      <p className="text-lg font-semibold text-white">{stat.value}</p>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
