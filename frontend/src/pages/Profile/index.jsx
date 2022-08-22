import { useState } from "react";
import { useAuth } from '../../hooks/auth'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg' // img pra qdo o user n tiver uma foto
import { api } from '../../services/api'
import { Container, Form, Avatar } from "./styles";
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

// o input de avatar vai ficar invisível, vai ser utilizado só pra abrir a janela de carregar a imagem.

export function Profile(){
  const {user, updateProfile} = useAuth() // tb vou acessar o update pq é uma função que faz parte do profile
  const [name, setName] = useState(user.name) // assim, já vai vir preenchido automaticamente esse dado qdo o usuário entrar na tela de perfil
  const [email, setEmail] = useState(user.email) // mesma coisa que acima
  const [oldPassword, setOldPassword] = useState() // aqui não acontece isso pq senha não pode exibir
  const [newPassword, setNewPassword] = useState() // mesma coisa que acima

  // se o user tiver um avatar, será mostrado com a url base; senão, mostra o placeholder
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl) // se já tiver avatar, vai vir pra cá.
  const [avatarFile, setAvatarFile] = useState(null) // carregar a nova imagem selecionada

  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }

  async function handleUpdate(){
    const updated = {
      name, 
      email,
      password: newPassword,
      old_password: oldPassword
    }

    // passando o user e o que eu tenho de atualizado; assim, se o usuário atualizar apenas um dado do perfil, aquilo que não foi mudado, vai continuar como estava 
    const userUpdated = Object.assign(user, updated)
    await updateProfile({user: userUpdated, avatarFile})
  }

  // essa função vai receber o event que é o evento de mudar o avatar
  function handleChangeAvatar(event){
    const file = event.target.files[0] // extraindo o arquivo, coloco o [0] pq é só uma foto/arquivo que o usuário vai selecionar
    setAvatarFile(file) // colocando o arquivo que o usuário acabou de selecionar - antes era null 

    const imagePreview = URL.createObjectURL(file) // pegando o arquivo
    setAvatar(imagePreview) // setando a foto
  }

  return(
    <Container> 
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft size={24}/>
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" /> {/* troquei o link do github pela const avatar que é pra não ficar fixo */}

          <label htmlFor="avatar">
            <FiCamera />

            <input id="avatar" onChange={handleChangeAvatar} type="file" /> 

          </label>

        </Avatar>

        <Input 
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name} // passando pra exibir o nome por padrão qdo entrar na tela de perfil
          onChange={e => setName(e.target.value)} // função pra atualizar o estado
        />

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email} // passando pra exibir o email por padrão qdo entrar na tela de perfil
          onChange={e => setEmail(e.target.value)} // função pra atualizar o estado
        />

        <Input 
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={e => setOldPassword(e.target.value)} // função pra atualizar o estado
        />

        <Input 
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={e => setNewPassword(e.target.value)} // função pra atualizar o estado
        />

        <Button title="Salvar" onClick={handleUpdate} />

      </Form>

    </Container>
  )
}