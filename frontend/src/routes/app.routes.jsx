import { Routes, Route } from 'react-router-dom'

// importando as interfaces que vão fazer parte das rotas da aplicação 
import { New } from '../pages/New'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Details } from '../pages/Details'

// o componente Routes vai envolver todas as rotas; e pra cada rota, eu digo qual o endereço e qual elemento eu quero renderizar.
// no details, eu preciso do código da nota pra exibir ela, então, eu passo com o :id
export function AppRoutes(){
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/new' element={<New />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/details/:id' element={<Details />} /> 
    </Routes>
  )
}