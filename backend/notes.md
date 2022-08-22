Para iniciar um projeto em Node, criar uma pasta para o projeto, abrir o terminal e comando npm init -y, vai criar o package JSON e posso alterar o autor e a descrição dentro dele, por exemplo.

Para instalar o Express, usar o comando npm install express.

Para gerar a pasta node_modules novamente, usar npm install. - colocar ela no gitignore.

Criando um script no package-json para executar o express: "start": "node ./src/server.js" e só executar npm start no terminal.

Métodos de requisições/verbos http
GET - Leitura
POST - Criação
PUT - Atualização
DELETE - Deleção
PATCH - Atualização parcial, específica

Colocando parâmetros na url: '/:id', por exemplo e usar o request.params para exibir o número que foi colocado na rota como id. 

Outra estratégia, além do Route Params, para enviar e capturar valores para a API, são os Query Params, exemplo: https://enderecoservidor.com.br/users?page=2&limit=10

A diferença é que o Route Params usa-se dois pontos e o nome do parâmetros e os valores serão obrigatoriamente colocados para exibir a rota, e no Query, eles são opcionais, mesmo sem eles a rota poderá ser acessada, mas os valores só serão exibidos se colocar os caracteres igual no exemplo acima. 

Para não precisar ficar reiniciando o servidor a cada alteração, instalar o nodemon no terminal, no pkgjson colocar "dev": "nodemon ./src/server.js", e rodar o comando npm run dev.

Usar node src/server.js no terminal para ver se funcionou a iniciação do Node, mas para automatizar essa execução, colocar no packageJSON:   "scripts": { "start": "node ./src/server.js"}

> Exemplo usando o método get com o route params:
app.get('/message/:id/:user', (req, res) => {
const {id, user} = req.params
res.send(`ID: ${id}. User: ${user}`)
})
* A barra é o endereço, a rota e dps a função; o req, a requisição que foi feita e o res que é o recurso para a resposta.
* O params serve pra passar informações/valores no endereço da rota; usado para dados simples.
> Exemplo usando o query params:
app.get('/users', (req, res) => {
const {page, limit} = req.query
res.send(`Página ${page}. Mostrar ${limit}.`)
})

Um Controller pode ter:
> index = GET para listar vários registros.
> show = GET para exibir um registro específico.
> create = POST para criar um registro.
> update = PUT para atualizar um registro.
> delete = DELETE para remover um registro.


Middleware: funções que tem acesso ao objeto de solicitação, ao objeto de resposta e à próxima função de middleware no ciclo solicitação-resposta do aplicativo. Podem executar qualquer código, fazer mudanças nos objetos de solicitação e resposta, encerrar o ciclo de solicitação-resposta e chamar o próximo middleware da pilha.
Exemplo: 
function myMiddleware(req, res, next){
* se o usuário não for admin (false):
if (!req.body.isAdmin) {
return res.json({message: "user unauthorized"})
}
next() (chama a próxima função a ser executada)
}

obs.: usersRoutes.use(myMiddleware) > fazendo assim, o middleware será aplicado para todas as rotas de usuário 

* usando o método post (preciso executar no insominia pois o navegador não executa):
usersRoutes.post('/', myMiddleware, userController.create) 
> entra na rota, coloca o middlware na rota pra fazer alguma verificação e, se cumprir a condição, cria o usuário.

> adicionar uma nova biblioteca no terminal para capturar erros 
npm install express-async-erros --save

> conectando com o banco de dados:
npm install sqlite3 sqlite --save

> comandos do banco de dados
INSERT INTO users 
(name, email, password)
VALUES 
('tainá', 'taina.mimess@hotmail.com', '123');

> listando 
SELECT * FROM users;
SELECT id, name, email FROM users;

UPDATE users SET 
avatar = 'taina.png',
name = 'Tai'
WHERE id = 1;

DELETE FROM users
WHERE id = 4

> criando uma tabela no bd (beekeeper)

create table users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR, 
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

> Alterar nome da tabela:
ALTER TABLE users 
RENAME TO clients

> Adicionando coluna status:
ALTER TABLE users 
ADD status VARCHAR

> Renomeando coluna status:
ALTER TABLE users 
RENAME COLUMN status to active

> Deletando coluna status:
ALTER TABLE users 
DROP COLUMN status

> CRUD
create > insert no bd
read > select no bd
update > update no bd
delete > delete no bd

> criptografando a senha do usuário 
npm install bcryptjs

> instalando o knex, que é uma query builder
npm install knex --save
npx knex init

> criando a migration createNotes no terminal:
npx knex migrate:make createNotes 

npm é uma ferramenta que se usa para instalar pacotes e npx é uma ferramenta para executar pacotes

A chave primária possui um id único com ela na tabela, já a chave estrangeira faz a referência desse id da chave primária em outras tabelas.

Cardinalidade: frequência que uma tabela se relaciona com a outra.

Inner join: comando para "unir" tabelas e exibí-las de forma unificada em uma consulta com os registros que possuem em comum. 
Uso:
Table: notes > pega a tabela notes
Primary_key: notes.id > pega o id da tabela notes
Foreign_key: tags.notes_id > pega o notes_id da tabela tags 

O map é uma função do JS para percorrer cada elemento que existe dentro do array e devolve um novo array.

O filter tem como foco filtrar, retornando um novo array só que filtrado.

Exemplos:
const tags=[
{id: 1, name: "node", note_id:1},
{id: 2, name: "express", note_id:1},
{id: 3, name: "react", note_id:1},
{id: 4, name: "javascript", note_id:2},
{id: 5, name: "frontend", note_id:2},
];

/*
> percorrendo todo o array e exibindo apenas o nome
const newArray = tags.map(tag => {
  return {
    name: tag.name
  }
})


> percorre todo o array e adiciona uma data no final de cada objeto
const newArray = tags.map(tag => {
  return {
    ...tag, 
    date: new Date()
  }
})
*/

// Filter >  pegando só as notas da tag de id 1
const newArray = tags.filter(tag => tag.note_id === 1)

> npm install jsonwebtoken

> npm install multer: pra fazer upload

> npm install cors: pra fazer a integração do front com o back

> npm install dotenv --save: pra fazer deploy
ir no md5 hash generator pra gerar uma nova chave secret e colocar no .env e depois no auth.js

> npx pm2 init
pra deixar a api/backend ativa o tempo todo; substituir no arquivo criado: 
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js", >>>>>>>>>> mudar pro scrip de inicialização, no caso, é o server.js
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}

> e depois: npm install pm2
> link da doc.: https://pm2.keymetrics.io/docs/integrations/heroku/
> passar no scripts do pkgjson - "start": "pm2-runtime start ecosystem.config.js --env production"
> depois, npm start

> mudar na baseURl da api.js a url que gerou no heroku

> npm install --save-dev jest: instalar pra rodar os testes
> npx jest --init
> npm test: pra executar os testes. ---- colocar o --watch no pkgjson no test
