import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from 'styled-components'
import GlobalStyles from './styles/global' // colocando o GlobalStyles dentro do ThemeProvider que é pra aplicação toda ter acesso aos estilos.

import { AuthProvider } from './hooks/auth'

import theme from './styles/theme' // passando o tema global no ThemeProvider abaixo

import {Routes} from './routes' // vai carregar o arquivo index - qdo não fala qual arquivo é pra carregar, por padrão, carrega o index.

// todas as rotas vão ficar dentro do contexto de autenticação e toda a lógica fica dentro do auth.js
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <ThemeProvider theme={theme}> 
    <GlobalStyles />
    <AuthProvider>
      <Routes /> 
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
