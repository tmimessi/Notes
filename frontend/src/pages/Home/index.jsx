import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import {FiPlus} from 'react-icons/fi'
import {FiSearch} from 'react-icons/fi'
import {Container, Brand, Menu, Search, Content, NewNote} from './styles'
// importando o header para ele continuar aparecendo nessa página, assim como os outros componentes
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { ButtonText } from '../../components/ButtonText'

export function Home(){
  // criando um estado pra trazer as tags na página home
  const [tags, setTags] = useState([])

  const [tagsSelected, setTagsSelected] = useState([])

  const [search, setSearch] = useState("")

  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  // criando uma função pra lidar com a tag selecionada, recebendo como parâmetro o nome da tag que está selecionada
  function handleTagSelected(tagName){
    // condição pra que quando as tags estiverem selecionadas e a pessoa clicar em "todos", deselecioná-las e selecionar o "todos"
    if(tagName === "all"){
      return setTagsSelected([])
    }
    
    // criando uma função pra remover a tag quando clico em cima dela novamente
    const alreadySelected = tagsSelected.includes(tagName) // vendo se a tag selecionada está dentro já da lista de tags
    // se estiver selecionada
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags) // passa as tags filtradas, mesmo a que eu acabei de desmarcar
    } else {
      // colocando dentro de um array pq eu posso selecionar várias tags, e não só uma. usando o spread operator pra mostrar tb o que tinha selecionado anteriormente
      setTagsSelected(prevState => [...prevState, tagName])
      }
    }

  // criando uma função que espera o id da nota selecionada e manda pra página de detalhes da nota
  function handleDetails(id){
    navigate(`/details/${id}`)
  }

  // o useEffect é uma função executada de forma automática quando a interface é carregada; no vetor [], pode-se colocar os estados dependentes - se o estado vinculado mudar, ele dispara o useEffect novamente. mas como só quero que as infos das tags carreguem na página apenas 1x, deixo vazio. dentro, posso colocar uma função, no caso, a de fetch pra ir buscar as tags.
  useEffect(() => {
    // detro da api, fazer um get em /tags e depois armazenar os dados da resposta no setTags
    async function fetchTags(){
      const response = await api.get("/tags")
      setTags(response.data)
    }
    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }
    fetchNotes()
  }, [tagsSelected, search]) // quando mudar o conteúdo do search ou do tagsSelected, vai executar de novo o useEffect, no caso, se o usuário selecionar uma tag, quero que a pesquisa recarregue de acordo com o filtro que o usuário está aplicando e no search pra que conforme ele digitar, a info refletir na interface

  return (
    <Container>
      <Brand>
      <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
         <ButtonText 
          title="Todos" 
          isActive={tagsSelected.length === 0} // pra saber se o botão todos está selecionado, posso pegar o estado tagsSelected e ver o tamanho dele, se for igual a zero, significa que não tem nada dentro dele, então automaticamente o retorno disso aqui vai ser verdadeiro
          onClick ={() => handleTagSelected("all")}
         />
        </li>
        {
          // verificando se existe tags; se existir, percorrer elas com o map e exibir; como esse item vai ser gerado a partir de uma lista, é importante colocar uma chave
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
              title={tag.name}
              onClick ={() => handleTagSelected(tag.name)}
              isActive={tagsSelected.includes(tag.name)} // verificando se a tag existe dentro do array, significa que ela está selecionada, então vai retornar verdadeiro se existir a tag lá dentro e falso caso contrário
              />
              </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
        placeholder="Pesquisar pelo título" 
        icon={FiSearch}
        onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
          <Note 
          key={String(note.id)}
          data={note}
          onClick={() => handleDetails(note.id)}
            />
            ))
          }
        </Section>
      </Content> 

      <NewNote to="/new">
        <FiPlus/>
        Criar nota
      </NewNote>
    </Container>
  )
}