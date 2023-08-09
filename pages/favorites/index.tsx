import { Layout } from "@/components/layouts"
import { NoFavorites } from "@/components/ui"
import { localFavorites } from "@/utils";
import { useEffect, useState } from "react"
import { FavoritePokemons } from "@/components/pokemon";

export default function FavoritesPage() {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons() );
  }, [])
  

  return (
    <Layout title="Pokémos - Favoritos">
      {
        favoritePokemons.length === 0
          ? ( <NoFavorites /> )
          : (
            <FavoritePokemons pokemons={favoritePokemons} />
          )
      }
      
    </Layout>
  )
}
