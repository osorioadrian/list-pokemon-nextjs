import { useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import {Card, CardHeader, CardBody, Image, Button} from "@nextui-org/react";
import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon
}

const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites( !isInFavorites )

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }
  
  return (
    <Layout title={ pokemon.name }>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
        <Card className="py-4">
          <CardBody className="overflow-visible py-2">
            <Image
              alt={ pokemon.name }
              className="object-cover rounded-xl"
              src={ pokemon.sprites.other?.dream_world.front_default || '/no-img.png' }
              width="100%"
              height={200}
            />
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{ pokemon.name}</h4>
              </div>
            </div>
            <Button
              color="primary"
              radius="full"
              onClick={ onToggleFavorite }
            >
              { isInFavorites ? 'En Favoritos' : 'Guardar En Favoritos' }
            </Button>
          </CardHeader>
          <CardBody className="overflow-visible py-2 gap-2 grid grid-cols-2 sm:grid-cols-4">
            <Image
              width={100}
              height={100}
              alt={ pokemon.name }
              src={ pokemon.sprites.front_default }
            />
            <Image
              width={100}
              height={100}
              alt={ pokemon.name }
              src={ pokemon.sprites.back_default }
            />
            <Image
              width={100}
              height={100}
              alt={ pokemon.name }
              src={ pokemon.sprites.front_shiny }
            />
            <Image
              width={100}
              height={100}
              alt={ pokemon.name }
              src={ pokemon.sprites.back_shiny }
            />
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemonNames: string[] = data.results.map( pokemon => pokemon.name );

  return {
    paths: pokemonNames.map( name => ({
      params: { name }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo( name );

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400
  }
}

export default PokemonNamePage;