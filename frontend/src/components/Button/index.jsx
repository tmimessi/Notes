import { Container } from "./styles";

// através de title, consigo acessar o título de cada botão (ou do props, mas fica mais extenso)
// o loading é para desabilitar o botão quando o usuário clicar, para evitar que ele fique clicando toda hora e fique enviando vários pedidos. passando o false que é pra quando não for informado, o padrão ser falso
// o if ternário é para se for verdadeiro, estiver carregando o pedido, aparecer a mensagem, senão, aparecer o texto do botão mesmo
// o rest operator é para que não tenha que ficar dizendo todas as propriedades do botão, apenas as que estão explícitas
export function Button({title, loading = false, ...rest}) {
  return (
  <Container 
  type="button"
  disabled={loading}
  {...rest}
  >
    {loading ? "Carregando..." : title} 
  </Container>
  ) 
}