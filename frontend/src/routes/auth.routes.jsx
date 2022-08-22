import { Routes, Route } from 'react-router-dom'

// importando as interfaces que vão fazer parte das rotas da aplicação 
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

// o componente Routes vai envolver todas as rotas; e pra cada rota, eu digo qual o endereço e qual elemento eu quero renderizar.
// no details, eu preciso do código da nota pra exibir ela, então, eu passo com o :id
export function AuthRoutes(){
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
    </Routes>
  )
}