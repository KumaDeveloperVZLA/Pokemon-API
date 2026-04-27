import Image from "next/image";
import Link from "next/link";
import type { PokemonListItem } from "@/lib/pokemon";

type PokemonCardProps = {
  pokemon: PokemonListItem;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
            #{pokemon.id}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {pokemon.name}
          </h2>
        </div>
        <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
          Ver detalle
        </span>
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-linear-to-br from-slate-900 via-slate-900 to-cyan-950/60 p-4">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={240}
          height={240}
          className="mx-auto h-44 w-44 transition duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
