import styled from 'styled-components'
import { Link } from 'react-router-dom' // para aplicar a navegação

export const Container = styled.header`
  grid-area: header; // pra quando rolar a tela, o header fique fixo
  height: 105px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
`

export const Profile = styled(Link)` //usando o link ao invés da div pra fazer a navegação
  display: flex;
  align-items: center;
  // com essa seta, estou estilizando apenas a imagem do header
  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    strong {
      font-size: 18px;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`

export const Logout = styled.button`
  border: none;
  background: none;

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 36px;
  }
`
