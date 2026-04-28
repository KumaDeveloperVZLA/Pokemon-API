"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PokemonType, PokemonGeneration } from "@/lib/pokemon";

type PokemonFiltersProps = {
  types: PokemonType[];
  generations: PokemonGeneration[];
};

export function PokemonFilters({ types, generations }: PokemonFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "";
  const currentGen = searchParams.get("generation") || "";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
      // Si cambiamos un filtro, reseteamos el otro para evitar conflictos complejos
      if (key === "type") params.delete("generation");
      if (key === "generation") params.delete("type");
    } else {
      params.delete(key);
    }
    // Siempre reiniciamos la paginación cuando cambia el filtro
    params.delete("page");
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <div className="flex flex-wrap gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex flex-col gap-2">
        <label htmlFor="type-filter" className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
          Filtrar por Tipo
        </label>
        <select
          id="type-filter"
          value={currentType}
          onChange={(e) => updateFilters("type", e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400"
        >
          <option value="">Todos los tipos</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="gen-filter" className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
          Filtrar por Generacion
        </label>
        <select
          id="gen-filter"
          value={currentGen}
          onChange={(e) => updateFilters("generation", e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400"
        >
          <option value="">Todas las generaciones</option>
          {generations.map((gen, index) => (
            <option key={gen.name} value={String(index + 1)}>
              Generacion {index + 1}
            </option>
          ))}
        </select>
      </div>
      
      {(currentType || currentGen) && (
        <div className="flex items-end">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
