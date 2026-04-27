const TYPE_STYLES: Record<string, string> = {
  bug: "border-lime-400/30 bg-lime-400/15 text-lime-100",
  dark: "border-slate-500/30 bg-slate-500/15 text-slate-100",
  dragon: "border-violet-400/30 bg-violet-400/15 text-violet-100",
  electric: "border-amber-300/30 bg-amber-300/15 text-amber-50",
  fairy: "border-pink-300/30 bg-pink-300/15 text-pink-50",
  fighting: "border-orange-400/30 bg-orange-400/15 text-orange-100",
  fire: "border-red-400/30 bg-red-400/15 text-red-100",
  flying: "border-sky-300/30 bg-sky-300/15 text-sky-50",
  ghost: "border-fuchsia-400/30 bg-fuchsia-400/15 text-fuchsia-100",
  grass: "border-emerald-400/30 bg-emerald-400/15 text-emerald-100",
  ground: "border-yellow-500/30 bg-yellow-500/15 text-yellow-50",
  ice: "border-cyan-300/30 bg-cyan-300/15 text-cyan-50",
  normal: "border-stone-400/30 bg-stone-400/15 text-stone-100",
  poison: "border-purple-400/30 bg-purple-400/15 text-purple-100",
  psychic: "border-rose-400/30 bg-rose-400/15 text-rose-100",
  rock: "border-amber-500/30 bg-amber-500/15 text-amber-100",
  steel: "border-slate-300/30 bg-slate-300/15 text-slate-50",
  water: "border-blue-400/30 bg-blue-400/15 text-blue-100",
};

type PokemonTypeBadgeProps = {
  type: string;
  variant?: "default" | "minimal";
};

export function PokemonTypeBadge({
  type,
  variant = "default",
}: PokemonTypeBadgeProps) {
  const className =
    TYPE_STYLES[type] ?? "border-white/20 bg-white/10 text-white";
  const variantClassName =
    variant === "minimal"
      ? "px-2.5 py-1 text-[0.65rem] tracking-[0.18em]"
      : "px-3 py-1 text-xs tracking-[0.25em]";

  return (
    <span
      className={`rounded-full border font-semibold uppercase ${variantClassName} ${className}`}
    >
      {type}
    </span>
  );
}
