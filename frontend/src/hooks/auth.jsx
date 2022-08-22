// o contexto vai ser usado para centralizar os dados de um usuário em um lugar só pra poder usar/acessar de toda a aplicação 

import { createContext, useContext, useState, useEffect } from "react"

import {api} from '../services/api'

export const AuthContext = createContext({})

// children são as rotas do contexto
function AuthProvider({children}) {
  const [data, setData] = useState({})
  // aqui eu passo o email e a password dentro de chaves pq tanto faz a ordem dessas infos
  async function signIn({email, password}){
    try {
      const res = await api.post("/sessions", {email, password})
      const {user, token} = res.data

      // guardando as infos no localStorage pra que quando o usuário atualizar a página, não voltar pra tela de login, pq tava voltando, pq a ideia era começar coom o setData vazio, então qdo atualiza, zera as infos e volta pro login, então preciso armazenar aqui
      // primeiro, passo a chave que quero utilizar e depois salvar o user, mas tenho que fazer o stringfy pq nele tem conteúdos de texto e número, e só pode ser texto, diferente do token que já é só texto msm
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      localStorage.setItem("@rocketnotes:token", token)

      // inserindo um token do tipo bearer de autorização no cabeçalho, por padrão, de todas as requisições que o usuário fizer
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // armazenando essas informações no setData
      setData({user, token})

    } catch (error) {
      if(error.res) { // se já tiver uma mensagem de erro configurada 
        alert(error.res.data.message)
      } else { // senão, exibe essa
        alert("Não foi possível entrar.")
      }
    }
  }

  // função pra sair qdo o user apertar no botão de sair, removendo as infos do local storage
  function signOut(){
  localStorage.removeItem("@rocketnotes:token")
  localStorage.removeItem("@rocketnotes:user")
  // voltando o setData como um objeeto vazio
  setData({})
  }

  // recebendo os dados do usuário na função
  async function updateProfile({user, avatarFile}){
    try {
      // se existe um avatar, preciso enviar como um arquivo, pq o backend tá esperando num campo chamado avatar
      if (avatarFile){
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile) // adicionando dentro do formulário um campo chamado avatar

        const response = await api.patch("/users/avatar", fileUploadForm) // fazendo uma requisição pro users/avatar mandando o form
        user.avatar = response.data.avatar // devolvendo o usuário com o conteúdo atualizado
      }

      await api.put("/users", user)
      localStorage.setItem('@rocketnotes:user', JSON.stringify(user)) // mandar as infos do user atualizadas
      // atualizando o setData
      setData({user, token: data.token})
      alert("Perfil atualizado com sucesso!")
    } catch (error) {
      if(error.res) { // se já tiver uma mensagem de erro configurada 
        alert(error.res.data.message)
      } else { // senão, exibe essa
        alert("Não foi possível atualizar o perfil.")
      }
    }
  }

  // primeira parte: o que eu quero que execute; segunda parte: um vetor pra colocar qlq estado e qdo ele mudar, dispara o useEffect novamente, deixar vazio pq ele vai carregar só uma vez após a renderização do componente, se colocar algo, ele vai ser executado quando o estado, o que tiver dentro, atualizar
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")
    // se tando o token qnt o user foram informados, insere o token no cabeçalho
    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setData({
        token,
        user: JSON.parse(user) // pegando os dados do usuário que estavam armazenados no tipo texto e voltando pra json
      })
    }
  }, [])

  // compartilhando a função de signIn e de signOut no contexto 
  return (
    <AuthContext.Provider value={{signIn, user: data.user, signOut, updateProfile}}>
      {children} 
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext)
  return context
}

export {AuthProvider, useAuth}