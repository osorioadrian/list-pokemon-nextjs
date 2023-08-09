import Image from "next/image"
import Link from 'next/link'
import { Spacer } from "@nextui-org/react"

export const Navbar = () => {
  

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0px 20px',
      backgroundColor: '#1c1d1f'
    }}>
      
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" 
        alt="icono de la app"
        width={70} height={70}
      />
        <Link href="/" passHref>
          <span color='white'>Pokémon</span>
        </Link>

      <Spacer style={{ flex: 1}}/>

      <Link href="/favorites" passHref>
        <span>Favoritos</span>
      </Link>
    </div>
  )
}
