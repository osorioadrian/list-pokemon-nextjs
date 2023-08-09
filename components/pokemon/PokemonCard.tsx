import { SmallPokemon } from "@/interfaces";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react"
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({pokemon}) => {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/name/${pokemon.name}`);
  }

  return (
    <Card 
      shadow="md"
      key={ pokemon.id }
      isPressable
      onClick={ handleClick }
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          height={100}
          alt={ pokemon.name }
          className="w-full object-cover h-[140px]"
          src={ pokemon.img }
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{pokemon.name}</b>
        <p className="text-default-500">#{pokemon.id}</p>
      </CardFooter>
    </Card>
  )
}
