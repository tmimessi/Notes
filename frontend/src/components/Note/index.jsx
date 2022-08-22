import {Container} from './styles'
import { Tag } from '../Tag'

/* 1. adicionando o título da nota no h1 */
/* 2. renderizando as tags, se existirem, e adicionando um footer */
/* 3. percorrendo cada tag e para cada uma, vai ter um id, pois é uma lista e cada elemento deve ser único e finalmente o nome da tag */
export function Note({data, ...rest}){
return(
  <Container {...rest}> 
    <h1>{data.title}</h1>
    {
      data.tags &&
      <footer>
        {
          data.tags.map(tag => 
            <Tag key={tag.id} title={tag.name} />)
        }
      </footer>
    }
  </Container>
)
  }