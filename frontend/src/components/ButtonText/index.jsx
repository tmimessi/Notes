import { Container } from "./styles";

// a propriedade isActive é para que o botão mude a cor apenas quando estiver selecionado/ativado, mas se não for atribuído um valor, ele será falso por padrão.
export function ButtonText({title, isActive = false, ...rest}) {
  return (
    <Container type="button"
    isActive={isActive}
    {...rest}>
      {title}
   </Container>
  )
}