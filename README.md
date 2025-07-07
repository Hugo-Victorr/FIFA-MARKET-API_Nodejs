# FIFA MARKET API

API RESTful desenvolvida em Node.js para gerenciar um sistema de FIFA MARKET, permitindo o gerenciamento de jogadores, posições, vendas e autenticação de usuários.

## Documentação SWAGGER

![image](https://github.com/user-attachments/assets/93209b12-42c8-4ddf-92a5-1eb5c7769278) ![image](https://github.com/user-attachments/assets/7921218f-6ce8-4db0-ab48-9bb2f7752276)

![image](https://github.com/user-attachments/assets/2b6f7f89-dbb1-4b9b-889d-3d6bb4e1a9e6) ![image](https://github.com/user-attachments/assets/e7c87834-cd12-4469-b4a1-b43481c41525)

![image](https://github.com/user-attachments/assets/9d5e7e71-5f83-4d79-b079-b252f0d24546) 

## Consumo da API em APP Mobile React Native

https://github.com/Hugo-Victorr/FIFA-MARKET-React_Native

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt
- Mongoose

## 📋 Funcionalidades

### Autenticação
- Registro de usuários
- Login com JWT
- Refresh Token para maior segurança
- Proteção de rotas com middleware de autenticação

### Gerenciamento de Jogadores
- CRUD completo de jogadores
- Associação de jogadores com usuários
- Filtros por posição

### Gerenciamento de Posições
- CRUD completo de posições
- Validação de dados
- Associação com usuários

### Sistema de Vendas
- Criação de vendas
- Adição de itens à venda
- Histórico de vendas por usuário
- Detalhamento de itens vendidos

## 🛠️ Estrutura do Projeto

```
nodejs-project/
├── controllers/
│   ├── JogadorController.js
│   ├── LoginController.js
│   ├── PosicaoController.js
│   ├── VendaController.js
│   └── VendaItemController.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── Jogador.js
│   ├── Posicao.js
│   ├── User.js
│   ├── Venda.js
│   └── VendaItem.js
├── routes/
│   ├── jogadores.js
│   ├── login.js
│   ├── posicoes.js
│   ├── vendas.js
│   └── vendaitens.js
├── app.js
└── package.json
```

## 🚦 Rotas da API

### Autenticação
- `POST /auth/register` - Registro de novo usuário
- `POST /auth/login` - Login de usuário
- `POST /auth/refresh` - Renovação do token de acesso
- `GET /auth/user/:id` - Obter dados do usuário

### Jogadores
- `GET /jogadores` - Listar todos os jogadores
- `POST /jogadores` - Criar novo jogador
- `GET /jogadores/:id` - Obter jogador específico
- `PUT /jogadores/:id` - Atualizar jogador
- `DELETE /jogadores/:id` - Deletar jogador

### Posições
- `GET /posicoes` - Listar todas as posições
- `POST /posicoes` - Criar nova posição
- `GET /posicoes/:id` - Obter posição específica
- `PUT /posicoes/:id` - Atualizar posição
- `DELETE /posicoes/:id` - Deletar posição

### Vendas
- `GET /vendas` - Listar todas as vendas
- `POST /vendas` - Criar nova venda
- `GET /vendas/:id` - Obter venda específica
- `PUT /vendas/:id` - Atualizar venda
- `DELETE /vendas/:id` - Deletar venda

### Itens de Venda
- `GET /vendaitens` - Listar todos os itens
- `POST /vendaitens` - Adicionar item à venda
- `GET /vendaitens/:id` - Obter item específico
- `PUT /vendaitens/:id` - Atualizar item
- `DELETE /vendaitens/:id` - Deletar item

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Sistema de refresh token
- Validação de dados em todas as rotas
- Proteção contra injeção de MongoDB
- Separação de responsabilidades (MVC)


