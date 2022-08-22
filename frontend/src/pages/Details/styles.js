import styled from 'styled-components' // importando para estilizar dentro do js

// armazenando dentro da constante um elemento html para estilizar
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 105px auto; // no header, haverá duas linhas, a primeira com 105px e a segunda com estilização padrão
  grid-template-areas: 
  "header"
  "content";

  // usando o main para aplicar o tamanho do grid de acordo com o content; o overflow é uma propriedade pra que quando o conteúdo não couber mais na tela, acionar a barra de rolagem da página.
  > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 64px 0;
  }
`
// criando um componente para a lista de links 
export const Links = styled.ul`
  list-style: none;
  > li {
    margin-top: 12px;

    a {
      color: ${({theme}) => theme.COLORS.WHITE};
    }
  }
`

export const Content = styled.div`
// levando todo o conteúdo para o centro da tela
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
    font-weight: 500;
    padding-top: 54px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
  }
`