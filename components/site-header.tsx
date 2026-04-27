"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

export function SiteHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return;
    }

    startTransition(() => {
      router.push(`/pokemon/${encodeURIComponent(normalizedQuery)}`);
    });
  }

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/75 backdrop-blur">
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
              Tu pokédex de confianza jiji
            </p>
          </div>
        </Link>

        <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 lg:w-[24rem]"
          >
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca por nombre o numero"
              aria-label="Buscar pokemon por nombre o numero"
              className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isPending || query.trim().length === 0}
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isPending ? "Buscando" : "Buscar"}
            </button>
          </form>

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
