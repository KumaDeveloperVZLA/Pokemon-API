import { getAllPokemonSuggestions } from "@/lib/pokemon";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const suggestions = await getAllPokemonSuggestions();
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}
