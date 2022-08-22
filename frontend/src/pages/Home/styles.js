import styled from 'styled-components'
import { Link } from 'react-router-dom' // para aplicar a navegação

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 250px auto; // essa tela vai ter 2 colunas, o menu (250px) e o restante da tela (auto)
  grid-auto-rows: 105px 128px auto 64px; // a primeira linha é do cabeçalho, a segunda do search, depois, o resto e a última é do botão
  grid-template-areas: // distribuindo as áreas 
    "brand header"
    "menu search"
    "menu content"
    "newnote content";

  background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};
`
export const Brand = styled.div`
  grid-area: brand;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};

  > h1 {
    font-size: 24px;
    color: ${({theme}) => theme.COLORS.ORANGE};
  }

`

export const Menu = styled.ul`
  grid-area: menu;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};
  padding-top: 64px;
  text-align: center;

  > li {  
    margin-bottom: 24px;
  }
`

export const Search = styled.div`
  grid-area: search;
  padding: 64px 64px 0;

`

export const Content = styled.div`
  grid-area: content;
  padding: 0 64px;
  overflow-y: auto;
`

// aqui estou usando o link ao invés do button pra navegação funcionar
export const NewNote = styled(Link)`
  grid-area: newnote;
  background: ${({theme}) => theme.COLORS.ORANGE};
  color: ${({theme}) => theme.COLORS.BACKGROUND_900};;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }
`