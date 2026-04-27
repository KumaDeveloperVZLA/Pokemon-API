"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition, useEffect, useRef } from "react";
import { PokemonSuggestion } from "@/lib/pokemon";

export function SiteHeader() {
  const router = useRouter();
  // Estado para el texto de busqueda
  const [query, setQuery] = useState("");
  // Estado para manejar la transicion de navegacion
  const [isPending, startTransition] = useTransition();
  
  // Lista completa de sugerencias obtenidas de la API
  const [allSuggestions, setAllSuggestions] = useState<PokemonSuggestion[]>([]);
  // Sugerencias filtradas que se muestran en el dropdown
  const [filteredSuggestions, setFilteredSuggestions] = useState<PokemonSuggestion[]>([]);
  // Controlar si el dropdown de sugerencias esta visible
  const [isOpen, setIsOpen] = useState(false);
  // Referencia para detectar clicks fuera del componente
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar todas las sugerencias al montar el componente para filtrado local rapido
  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetch("/api/pokemon/suggestions");
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllSuggestions(data);
        }
      } catch (error) {
        console.error("Error al cargar sugerencias", error);
      }
    }
    fetchSuggestions();
  }, []);

  // Filtrar sugerencias cada vez que el usuario escribe
  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = allSuggestions.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.includes(query)
      ).slice(0, 8); // Mostrar maximo 8 resultados
      setFilteredSuggestions(filtered);
      setIsOpen(true);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
  }, [query, allSuggestions]);

  // Cerrar el dropdown si se hace click fuera del buscador
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar la seleccion de una sugerencia
  function handleSelectSuggestion(pokemonId: string) {
    setIsOpen(false);
    setQuery("");
    startTransition(() => {
      router.push(`/pokemon/${pokemonId}`);
    });
  }

  // Manejar el envio del formulario (Enter o click en Buscar)
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return;

    setIsOpen(false);
    startTransition(() => {
      router.push(`/pokemon/${encodeURIComponent(normalizedQuery)}`);
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-lg font-bold text-cyan-200">
            P
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Pokemon API
            </p>
            <p className="text-lg font-semibold text-white">
              Tu pokedex de confianza jiji
            </p>
          </div>
        </Link>

        <div className="relative flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center" ref={containerRef}>
          {/* Formulario con entrada de busqueda y boton */}
          <form
            onSubmit={handleSubmit}
            className="group relative flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 transition-all focus-within:border-cyan-400/50 focus-within:bg-white/10 lg:w-[24rem]"
          >
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => query.trim().length > 1 && setIsOpen(true)}
              placeholder="Busca por nombre o numero"
              className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isPending || query.trim().length === 0}
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isPending ? "..." : "Buscar"}
            </button>
          </form>

          {/* Lista desplegable de sugerencias (Autocomplete) */}
          {isOpen && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl lg:w-[24rem]">
              <ul className="py-2">
                {filteredSuggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion.id)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10 hover:text-cyan-300"
                    >
                      <span className="font-medium">{suggestion.name}</span>
                      <span className="text-xs text-slate-500">#{suggestion.id}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <nav className="text-sm font-medium text-slate-300">
            <Link
              href="/"
              className="rounded-full border border-white/10 px-4 py-2 transition hover:border-cyan-300/40 hover:text-white"
            >
              Inicio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
