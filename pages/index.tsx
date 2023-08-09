
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { Layout } from '@/components/layouts';
import { GetStaticProps } from 'next'
import { pokeApi } from '@/api';
import { PokemonCard } from '@/components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

export default function Home({ pokemons }: Props) {
  
  return (
    <Layout title='Listado de Pokémons'>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon }/>
          ))}
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}