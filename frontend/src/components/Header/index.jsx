import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg' 
import { RiShutDownLine } from 'react-icons/ri' // importando o ícone que quero utilizar
import { Container, Profile, Logout } from "./styles";
export function Header(){
  const {signOut, user} = useAuth() // acessando o useAuth do signOut e chamando ela lá embaixo no botão de logout

    // se o user tiver um avatar, será mostrado com a url base; senão, mostra o placeholder
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  return(
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl}
        alt={user.name}
        />
        <div>
          <span>Bem-vinda,</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      
    <Logout onClick={signOut}>
      <RiShutDownLine />
    </Logout>

    </Container>
  )
}