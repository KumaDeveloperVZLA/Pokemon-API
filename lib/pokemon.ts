const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

type PokemonListResponse = {
  results: Array<{
    name: string;
    url: string;
  }>;
};

type PokemonDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
};

export type PokemonListItem = {
  id: string;
  routeId: string;
  name: string;
  image: string;
  types: string[];
};

export type PokemonStat = {
  name: string;
  label: string;
  value: number;
};

export type PokemonDetail = PokemonListItem & {
  heightInMeters: string;
  weightInKilograms: string;
  abilities: string[];
  types: string[];
  stats: PokemonStat[];
};

export type PokemonSuggestion = { /*tipo de datos exportado para sugerencia*/
  name: string;
  id: string;
};

export type PokemonType = { //tipo de pokemones
  name: string;
  url: string;
};

export type PokemonGeneration = { //generacion de pokemones
  name: string;
  url: string;
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque esp.",
  "special-defense": "Defensa esp.",
  speed: "Velocidad",
};

async function fetchFromPokeApi<T>(path: string): Promise<T | null> {
  const response = await fetch(`${POKE_API_BASE_URL}${path}`, {
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`PokeAPI request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function formatPokemonId(id: number | string) {
  return String(id).padStart(3, "0");
}

function formatPokemonName(name: string) {
  return formatLabel(name);
}

function getPokemonImage(id: number | string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Number(id)}.png`;
}

function extractPokemonId(url: string) {
  // Buscamos el numero al final de la URL, sin importar el prefijo
  const match = url.match(/\/(\d+)\/?$/);

  if (!match) {
    throw new Error(`Unable to extract id from ${url}`);
  }

  return Number(match[1]);
}

function normalizePokemonIdentifier(value: string | number) {
  const normalizedValue = String(value).trim().toLowerCase();

  if (/^\d+$/.test(normalizedValue)) {
    return String(Number(normalizedValue));
  }

  return normalizedValue;
}

function mapPokemonDetail(pokemon: PokemonDetailResponse): PokemonDetail {
  return {
    id: formatPokemonId(pokemon.id),
    routeId: String(pokemon.id),
    name: formatPokemonName(pokemon.name),
    image:
      pokemon.sprites.other?.["official-artwork"]?.front_default ??
      getPokemonImage(pokemon.id),
    heightInMeters: (pokemon.height / 10).toFixed(1),
    weightInKilograms: (pokemon.weight / 10).toFixed(1),
    abilities: pokemon.abilities.map((ability) =>
      formatLabel(ability.ability.name),
    ),
    types: pokemon.types.map((type) => type.type.name),
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      label: STAT_LABELS[stat.stat.name] ?? formatLabel(stat.stat.name),
      value: stat.base_stat,
    })),
  };
}

function mapPokemonListItem(pokemon: PokemonDetailResponse): PokemonListItem {
  return {
    id: formatPokemonId(pokemon.id),
    routeId: String(pokemon.id),
    name: formatPokemonName(pokemon.name),
    image:
      pokemon.sprites.other?.["official-artwork"]?.front_default ??
      getPokemonImage(pokemon.id),
    types: pokemon.types.map((type) => type.type.name),
  };
}

export async function getPokemonList(limit = 52): Promise<PokemonListItem[]> {
  const response = await fetchFromPokeApi<PokemonListResponse>(
    `/pokemon?limit=${limit}`,
  );

  if (!response) {
    return [];
  }

  const pokemonDetails = await Promise.allSettled(
    response.results.map(async (pokemon) => {
      const pokemonId = extractPokemonId(pokemon.url);
      const detail = await fetchFromPokeApi<PokemonDetailResponse>(
        `/pokemon/${pokemonId}`,
      );

      if (!detail) {
        return null;
      }

      return mapPokemonListItem(detail);
    }),
  );

  return pokemonDetails.flatMap((result) => {
    if (result.status === "fulfilled" && result.value) {
      return [result.value];
    }

    return [];
  });
}

export async function getPokemonById(
  id: string | number,
): Promise<PokemonDetail | null> {
  const normalizedId = normalizePokemonIdentifier(id);
  const response = await fetchFromPokeApi<PokemonDetailResponse>(
    `/pokemon/${normalizedId}`,
  );

  if (!response) {
    return null;
  }

  return mapPokemonDetail(response);
}



/*

estas funciones trabajan con el fetch all de la api para las sugerencias de
pokemones, tipos y la generacion

*/

export async function getAllPokemonSuggestions(): Promise<PokemonSuggestion[]> {
  const response = await fetchFromPokeApi<PokemonListResponse>(
    "/pokemon?limit=2000",
  );

  if (!response) {
    return [];
  }

  return response.results.map((pokemon) => ({
    name: formatPokemonName(pokemon.name),
    id: String(extractPokemonId(pokemon.url)),
  }));
}

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response = await fetchFromPokeApi<{ results: PokemonType[] }>("/type");
  return response?.results ?? [];
}

export async function getPokemonGenerations(): Promise<PokemonGeneration[]> {
  const response = await fetchFromPokeApi<{ results: PokemonGeneration[] }>(
    "/generation",
  );
  return response?.results ?? [];
}

export async function getPokemonByType(type: string): Promise<PokemonListItem[]> {
  const response = await fetchFromPokeApi<{ pokemon: Array<{ pokemon: { name: string, url: string } }> }>(
    `/type/${type}`,
  );

  if (!response) return [];

  const pokemonDetails = await Promise.allSettled(
    response.pokemon.slice(0, 52).map(async (p) => {
      const pokemonId = extractPokemonId(p.pokemon.url);
      const detail = await fetchFromPokeApi<PokemonDetailResponse>(
        `/pokemon/${pokemonId}`,
      );
      return detail ? mapPokemonListItem(detail) : null;
    }),
  );

  return pokemonDetails.flatMap((result) =>
    result.status === "fulfilled" && result.value ? [result.value] : []
  );
}

export async function getPokemonByGeneration(gen: string): Promise<PokemonListItem[]> {
  const response = await fetchFromPokeApi<{ pokemon_species: Array<{ name: string, url: string }> }>(
    `/generation/${gen}`,
  );

  if (!response) return [];

  // Extraemos los IDs y ordenamos para que la lista tenga sentido (del 1 en adelante)
  const sortedSpecies = response.pokemon_species
    .map((p) => ({ ...p, id: extractPokemonId(p.url) }))
    .sort((a, b) => a.id - b.id)
    .slice(0, 52); // Limitamos a los primeros 52 por rendimiento

  const pokemonDetails = await Promise.allSettled(
    sortedSpecies.map(async (p) => {
      const detail = await fetchFromPokeApi<PokemonDetailResponse>(
        `/pokemon/${p.id}`,
      );
      return detail ? mapPokemonListItem(detail) : null;
    }),
  );

  return pokemonDetails.flatMap((result) =>
    result.status === "fulfilled" && result.value ? [result.value] : []
  );
}
