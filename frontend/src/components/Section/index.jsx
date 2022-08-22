import {Container} from './styles'

// será essa mesma estrutura para todas as páginas, mas o título vai se manter inalterado e o children vai mudar em cada uma, por isso é feito desta  maneira; a estilização para ele está em links, que foi configurado no style da pasta Details.
export function Section({title, children}) {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  )
}