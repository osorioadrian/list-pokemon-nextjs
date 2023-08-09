import {Card, CardBody, Image} from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  pokemonId: number;
}

export const FavoriteCardPokemons: FC<Props> = ({pokemonId}) => {

  const router = useRouter();

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${ pokemonId }`);
  }

  return (
    <Card shadow="sm" key={pokemonId} isPressable onClick={ onFavoriteClicked }>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt="Pokémos"
          className="w-full object-cover h-[140px]"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        />
      </CardBody>
    </Card>
  )
}
