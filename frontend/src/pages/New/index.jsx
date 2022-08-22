import { useState } from 'react' // armazenar os estados da aplicação
import {Header} from '../../components/Header'
import {Input} from '../../components/Input'
import {Textarea} from '../../components/Textarea'
import {Section} from '../../components/Section'
import {Button} from '../../components/Button'
import {ButtonText} from '../../components/ButtonText'
import { NoteItem } from '../../components/NoteItem'
import { Container, Form } from './styles'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function New(){
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  

  // estado pra armazenar os antigos links 
  const [links, setLinks] = useState([])
  // estado pra armazenar os novos links adicionados
  const [newLink, setNewLink] = useState("")

  // estado pra armazenar as antigas tags
  const [tags, setTags] = useState([])
  // estado pra armazenar as novas tags adicionadas
  const [newTag, setNewTag] = useState("")

  // usando o navigate pra poder mudar a página na navegação
  const navigate = useNavigate()

  // função pra voltar pra home 
  function handleBack(){
    navigate(-1)
  }

  // função pra atualizar o estado adicionando um novo link
  function handleAddlink(){
    // acessar o estado anterior, pegar o que tinha antes e montar um operador despejando isso + o novo link adicionado
    setLinks(prevState => [...prevState, newLink])
    // limpar pra ter o estado "resetado"
    setNewLink("")
  }

  // função pra remover um link adicionado, recebendo como parâmetro o link que eu quero deletar e o estado contendo o estado anterior, ou seja, os links que foram adc; aplico um filter que vai retornar uma nova lista com todos os links, menos o link que eu quero deletar
  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  // função pra o estado adicionando uma nova tag - a lógica é a mesma da função de adc link ---- ...spread operator
  function handleAddTag(){
    setTags(prevState => [...prevState, newTag])
    setNewTag("") // pra limpar o campo depois de adicionada a tag
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote(){
    // validando campos - caso a pessoa não tenha digitado nada
    if (!title){
      return alert("Digite o título da nota.")
    }

    // caso a pessoa tenha digitado algo mas não tenha clicado no botão de add
    if (newLink){
      return alert("Você deixou um link no campo para adicionar, mas não clicou no botão de adicionar. Clique ou deixe o campo vazio.")
    }

    if (newTag){
      return alert("Você deixou uma tag no campo para adicionar, mas não clicou no botão de adicionar. Clique ou deixe o campo em branco.")
    }

    // essa função vai primeiro esperar o que a api vai fazer (await), que vai enviar através do método post em notes e dps passa os objeto que quero mandar
    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert ("Nota criada com sucesso!")
    navigate(-1) // depois de clicar no botão de criar a nota, redirecionar o usuário para a página  inicial
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
            title="Voltar" 
            onClick={handleBack} 
            />
          </header>

          <Input 
          placeholder="Título"
          onChange={e => setTitle(e.target.value)}
          />

          <Textarea 
          placeholder="Observações"
          onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {/* na variável links é aonde eu guardo o vetor de armazenar os links que foram adicionados, colocando aqui pra os exibir na tela; como é um componente que vai renderizar uma lista, preciso de uma key pq o map devolve tb um index, que é a posição do item na lista; cada vez que eu adicionar um link, vai ser criado um novo componente/campo (input) para adicionar o próximo link; quando clicar, vai remover o link */}
            {
              links.map((link, index) => (
                <NoteItem 
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
                />
              ))
            }

          <NoteItem 
          isNew 
          placeholder="Novo link"
          value={newLink}
          onChange={e => setNewLink(e.target.value)}
          onClick={handleAddlink}
          />

          </Section>

          <Section title="Marcadores">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                  <NoteItem 
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
            <NoteItem 
            isNew 
            placeholder="Nova tag"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onClick={handleAddTag}
            />
            </div>
          </Section>
        
        <Button 
        title="Salvar"
        onClick={handleNewNote}
        />

        </Form>
      </main>
     
    </Container>
  )
}
