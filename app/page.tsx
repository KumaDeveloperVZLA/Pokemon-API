import { PokemonCard } from "@/components/pokemon-card";
import { getPokemonList } from "@/lib/pokemon";

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
          Pokedex
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Descubre pokemones en esta vaina.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Esta home consume la PokéAPI desde el servidor y muestra pokemones
          para que te culturices desgraciao (20 profe bella muak).
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
}
