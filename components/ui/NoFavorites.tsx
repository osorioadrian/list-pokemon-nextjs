import { Image } from "@nextui-org/react"

export const NoFavorites = () => {
  return (
    <div className="text-4xl grid justify-items-center">
      No Hay Favoritos
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" 
        alt="icono de la app"
        width={250}
        height={250}
        style={{ opacity: 0.1 }}
      />
    </div>
  )
}
