# Registro de gastos financeiros - BYTEBANK 💸

A proposta de projeto do Tech Challenge criado pela FIAP para turmas do pós-tech em Front-end Engineering é uma interface que permite os usuários gerenciarem suas transações financeiras.

A API está disponível no [Railway](https://nest-bytebank-api-production.up.railway.app/).

### Configurando variáveis de ambiente
Para a API funcionar apropriadamente, é necessário criar uma conta no [MongoDB](cloud.mongodb.com/) e, em seguida, iniciar um novo projeto com um cluster.

1. Vá até o projeto e clique em "conectar"
2. Copie a URL de conexão com a sua senha 
4. Abra o git bash da sua máquina e rode o seguinte comando para gerar um JWT token:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
// OU se você tem o openssl instalado:
openssl rand -base64 64 
```
3. Na raíz do projeto, crie um arquivo .env e configure da seguinte forma:
```bash
DB_URL=mongodb+srv://<SEU_PROJETO>:<SUA_SENHA>@clusterX.mongodb.net/etc
JWT_SECRET=<SEU_JWT_SECRET>
PORT=3003
```

## Rodando localmente
Requisitos:
- node: "^18.19.1
- npm: "^6.11.0

```bash
git clone <link-do-repositório>
cd nest-bytebank-api
npm install
npm start run:dev
```

## Rodando no Docker
```bash
docker-compose up --build
```
Isso vai construir a imagem e container do projeto, e quando o processo for finalizado, a url da máquina local estará disponível na porta 3003.
