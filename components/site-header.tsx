import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/75 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-lg font-bold text-cyan-200">
            P
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Pokemon API
            </p>
            <p className="text-lg font-semibold text-white">Pokédex de confianza</p>
          </div>
        </Link>

        <nav className="text-sm font-medium text-slate-300">
          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-cyan-300/40 hover:text-white"
          >
            Inicio
          </Link>
        </nav>
      </div>
    </header>
  );
}
