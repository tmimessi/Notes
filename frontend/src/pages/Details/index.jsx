import {Container, Links, Content} from './styles'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useParams, useNavigate } from 'react-router-dom' // pra buscar pelos parâmetros que existem na rota
// o nome do arquivo e do componente (função) tem que começar com letra maiúscula.
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Section } from '../../components/Section' 
import { ButtonText } from '../../components/ButtonText'
import { Tag } from '../../components/Tag'

export function Details() {
  const [data, setData] = useState(null)
  
  const params = useParams()

  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }


  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?")
    
    if (confirm) {
      await api.delete(`notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    // buscando os dados de uma nota
    async function fetchNote(){
      // fazendo uma requisição pra API
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    fetchNote()
  }, [])

  // renderizando, exibindo o conteúdo da interface no navegador para o usuário.
  return(
    <Container>
      <Header />
      {
        // se tem conteúdo, mosta o data, garantindo que terei infos pra carregar
        data && 
        <main>
          < Content>
        <ButtonText 
        title="Excluir nota"
        onClick={handleRemove}
        />

          <h1>
            {data.title}
          </h1>
          
          <p>
            {data.description}
          </p>

{
  // só renderizo essa seção se tiver links pra renderizar
  data.links &&
    <Section title="Links úteis"> 
      <Links>
        {
          // percorrendo cada um dos links e exibindo
          data.links.map(link => (
            <li key={String(link.id)}>
              <a href={link.url} target="_blank">
                {link.url}
                </a>
            </li>
          ))
        }
      </Links>
    </Section>
}

{
  // só renderizo essa seção se tiver tags pra renderizar
  data.tags &&
    <Section title="Marcadores"> 
      {
         data.tags.map(tag => (
        <Tag 
        key={String(tag.id)}
        title={tag.name} 
        />
         ))
      }
    </Section>

}

    <Button 
    title="Voltar" 
    onClick={handleBack}
    />

     </Content>

        </main>

      }

    </Container>
  )
}