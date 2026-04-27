import { PokemonCard } from "@/components/pokemon-card";
import { PokemonFilters } from "@/components/pokemon-filters";
import { 
  getPokemonList, 
  getPokemonByType, 
  getPokemonByGeneration, 
  getPokemonTypes, 
  getPokemonGenerations 
} from "@/lib/pokemon";

type HomeProps = {
  searchParams: Promise<{ type?: string; generation?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  // Extraer parametros de busqueda de la URL
  const { type, generation } = await searchParams;

  // Obtener tipos y generaciones para los selectores
  const [types, generations] = await Promise.all([
    getPokemonTypes(),
    getPokemonGenerations()
  ]);

  // Determinar que lista de pokemones cargar segun el filtro
  let pokemonList;
  let title = "Descubre pokemones en esta vaina.";

  if (type) {
    pokemonList = await getPokemonByType(type);
    title = `Pokemones de tipo ${type}`;
  } else if (generation) {
    pokemonList = await getPokemonByGeneration(generation);
    title = `Pokemones de la Generacion ${generation}`;
  } else {
    pokemonList = await getPokemonList();
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
          Pokedex
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Esta home consume la PokeAPI desde el servidor y muestra pokemones
          para que te culturices (20 profe bella muak).
        </p>
      </div>

      {/* Componente de filtros */}
      <PokemonFilters types={types} generations={generations} />

      {pokemonList.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 py-20 text-center">
          <p className="text-lg text-slate-400">No se encontraron pokemones con estos filtros.</p>
        </div>
      )}
    </section>
  );
}
