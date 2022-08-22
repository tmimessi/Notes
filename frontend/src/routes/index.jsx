import { BrowserRouter } from 'react-router-dom'

import { useAuth } from '../hooks/auth' // importanto o hook de autenticação pra acessar o usuário

import { AppRoutes } from './app.routes'

import {AuthRoutes} from './auth.routes'

// se o usuário estiver conectado, levar ele para as rotas da aplicação; senão, levar ele para a rota de autenticação.
export function Routes(){
  const { user } = useAuth()
  return(
    <BrowserRouter>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  )
} 

// quando eu faço o login, o login atualizou o conteúdo do user e eu estou compartilhando no meu contexto o usuário. antes de fazer login, o user era um conteúdo vazio