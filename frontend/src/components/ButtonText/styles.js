import styled from 'styled-components'

export const Container = styled.button`
  background: none;
  // se o botão estiver ativo, deixar laranja, senão, deixar cinza.
  color: ${({theme, isActive}) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  border: none;
  font-size: 16px;
`