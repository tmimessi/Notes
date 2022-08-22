import { useState } from "react"; // é um hook pra criar um estado pra pegar a informação que o usuário digitou na tela de login de forma dinâmica, mantendo atualizado
import { Container, Form, Background } from "./styles";
import { Input } from "../../components/Input"
import { FiMail, FiLock, FiUser} from 'react-icons/fi'
import { Button } from "../../components/Button"
import { Link, useNavigate } from 'react-router-dom' // para aplicar a navegação

import {api} from "../../services/api"

export function SignUp(){
  const [name, setName] = useState("") // o valor inicial deste estado é vazio pois quando abre a tela de login não tem nada digitado inicialmente. o estado é o name e a função que atualiza esse estado é o setName
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate() 

  function handleSignUp(){ // testando se o conteúdo está chegando nos estados que foram configurados quando clicar no botão de cadastrar
    if(!name || !email || !password){ // verificando se algum desses campos está vazio
      return alert("Preencha todos os campos!")
    } 

    // acessando a API - se o acesso der certo, exibir a mensagem de sucesso no then, senão, capturar e exibir a mensagem de erro específica que foi configurada no back, se não houver, exibir a que foi colocada aqui, no catch.
    api.post("/users", {name, email, password})
    .then(() => {
      alert("Usuário cadastrado com sucesso!")
      navigate("/") // redirecionando pra página de login depois que o usuário se cadastra
    })
    .catch(error => {
      if(error.res){
        alert(error.res.data.message)
      } else {
        alert("Não foi possível cadastrar.")
      }
    })
  } 

  return (
    <Container>
            <Background/>
      <Form>
        <h1>Rocketnotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>
        <h2>Crie sua conta</h2>

        <Input 
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)} // toda vez que o valor do input muda, ela dispara um evento (e), usando uma arrow function pra transferir pra dentro do setName o que tem dentro do e por meio do e.target.value
        />

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp}/>

        <Link to="/">
          Voltar para o login
          </Link>

      </Form>
    </Container>
  )
}