import {Container} from './styles'

// um ícno como propriedade e depois passando todo o restante das propriedades para o input
// vou dizer toda a propriedade do ícone em minúscula e converto para usar o componente em maiúsculo
// como não são todos os inputs que terão um ícone antes, usei a lógica abaixo para se tiver, mostro, senão, não.
export function Input({icon: Icon, ...rest}){
  return(
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest}/>
    </Container>
  )
}