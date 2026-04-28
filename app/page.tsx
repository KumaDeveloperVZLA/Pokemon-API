import Link from "next/link";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonFilters } from "@/components/pokemon-filters";
import {
  getPokemonList,
  getPokemonByType,
  getPokemonByGeneration,
  getPokemonTypes,
  getPokemonGenerations,
  PaginatedPokemonResponse,
} from "@/lib/pokemon";

type HomeProps = {
  searchParams: Promise<{ type?: string; generation?: string; page?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { type, generation, page: pageParam } = await searchParams;
  const pageSize = 8;
  const parsedPage = Number(pageParam);
  const currentPage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  // Obtener tipos y generaciones para los selectores
  const [types, generations] = await Promise.all([
    getPokemonTypes(),
    getPokemonGenerations(),
  ]);

  // Determinar que lista de pokemones cargar segun el filtro
  let pokemonPage: PaginatedPokemonResponse;
  let title = "Descubre pokemones en esta vaina.";

  if (type) {
    pokemonPage = await getPokemonByType(type, currentPage, pageSize);
    title = `Pokemones de tipo ${type}`;
  } else if (generation) {
    pokemonPage = await getPokemonByGeneration(generation, currentPage, pageSize);
    title = `Pokemones de la Generacion ${generation}`;
  } else {
    pokemonPage = await getPokemonList(currentPage, pageSize);
  }

  const totalPages = Math.max(1, Math.ceil(pokemonPage.total / pageSize));

  const buildPageHref = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (type) params.set("type", type);
    if (generation) params.set("generation", generation);
    if (pageNumber > 1) params.set("page", String(pageNumber));

    const query = params.toString();
    return query ? `/?${query}` : "/";
  };

  const paginationItems: Array<number | "ellipsis"> = [];
  const visibleRange = 2;
  const startPage = Math.max(1, currentPage - visibleRange);
  const endPage = Math.min(totalPages, currentPage + visibleRange);

  if (startPage > 1) {
    paginationItems.push(1);
  }

  if (startPage > 2) {
    paginationItems.push("ellipsis");
  }

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber += 1) {
    paginationItems.push(pageNumber);
  }

  if (endPage < totalPages - 1) {
    paginationItems.push("ellipsis");
  }

  if (endPage < totalPages) {
    paginationItems.push(totalPages);
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

      {pokemonPage.pokemons.length > 0 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pokemonPage.pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              Página {currentPage} de {totalPages}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={buildPageHref(currentPage - 1)}
                className={`rounded-xl border px-4 py-2 text-sm transition ${
                  currentPage <= 1
                    ? "cursor-not-allowed border-slate-700 text-slate-500"
                    : "border-cyan-400 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-500/10"
                }`}
                aria-disabled={currentPage <= 1}
              >
                Anterior
              </Link>

              {paginationItems.map((item, index) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-sm text-slate-400"
                  >
                    …
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={buildPageHref(item)}
                    className={`rounded-xl border px-4 py-2 text-sm transition ${
                      item === currentPage
                        ? "border-cyan-400 bg-cyan-500/15 text-cyan-100"
                        : "border-white/10 text-slate-200 hover:border-cyan-300 hover:bg-cyan-500/10"
                    }`}
                  >
                    {item}
                  </Link>
                ),
              )}

              <Link
                href={buildPageHref(currentPage + 1)}
                className={`rounded-xl border px-4 py-2 text-sm transition ${
                  currentPage >= totalPages
                    ? "cursor-not-allowed border-slate-700 text-slate-500"
                    : "border-cyan-400 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-500/10"
                }`}
                aria-disabled={currentPage >= totalPages}
              >
                Siguiente
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 py-20 text-center">
          <p className="text-lg text-slate-400">No se encontraron pokemones con estos filtros.</p>
        </div>
      )}
    </section>
  );
}
