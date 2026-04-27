import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PokemonStatBar } from "@/components/pokemon-stat-bar";
import { PokemonTypeBadge } from "@/components/pokemon-type-badge";
import { getPokemonById } from "@/lib/pokemon";

type PokemonDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PokemonDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemon = await getPokemonById(id);

  if (!pokemon) {
    return {
      title: "Pokemon no encontrado | Poke Next",
    };
  }

  return {
    title: `${pokemon.name} | Poke Next`,
    description: `Consulta tipos, habilidades y estadisticas base de ${pokemon.name}.`,
  };
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = await params;
  const pokemon = await getPokemonById(id);

  if (!pokemon) {
    notFound();
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-sky-950/30 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
              #{pokemon.id}
            </span>
            {pokemon.types.map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {pokemon.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Consulta el resumen del pokemon, sus habilidades principales y sus
            estadisticas base para usar esta ruta como detalle individual.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <dt className="text-sm text-slate-400">Altura</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">
                {pokemon.heightInMeters} m
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <dt className="text-sm text-slate-400">Peso</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">
                {pokemon.weightInKilograms} kg
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <dt className="text-sm text-slate-400">Habilidades</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                {pokemon.abilities.join(", ")}
              </dd>
            </div>
          </dl>
        </article>

        <aside className="rounded-[2rem] border border-white/10 bg-linear-to-b from-cyan-400/20 to-blue-500/15 p-8 shadow-2xl shadow-sky-950/30">
          <div className="mx-auto flex max-w-sm justify-center">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={320}
              height={320}
              className="h-auto w-full drop-shadow-[0_24px_60px_rgba(8,145,178,0.35)]"
              priority
            />
          </div>
        </aside>
      </div>

      <article className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-sky-950/20 backdrop-blur">
        <h2 className="text-2xl font-semibold text-white">Estadisticas base</h2>
        <div className="mt-6 grid gap-4">
          {pokemon.stats.map((stat) => (
            <PokemonStatBar key={stat.name} stat={stat} />
          ))}
        </div>
      </article>
    </section>
  );
}
