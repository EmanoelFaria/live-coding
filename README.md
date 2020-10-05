<h1 align="center">Starships API</h1>

## Pré-requisitos

- [Node.JS](https://nodejs.org/) version 10.13
- [PostgresSQL](https://www.postgresql.org/) version 12.4

## Rodando o projeto

```
# Clone o repositório
git clone https://github.com/EmanoelFaria/live-coding.git

# Va para a pasta do projeto
cd live-coding

#Crie um arquivo de config de desenvolvimento .env.development e preencha
# de acordo com o arquivo .env.example do projeto.

# Instale as dependências
npm install

# Crie o banco de dados
NODE_ENV=development npx sequelize-cli db:create && \
  NODE_ENV=development npx sequelize-cli db:migrate && \
  NODE_ENV=development npx sequelize-cli db:seed:all


# Rode o serviço em modo de desenvolvimento
npm run dev
```

## Rodando os testes

```
# Crie o banco de dados
NODE_ENV=test npx sequelize-cli db:create

# Rode os testes
npm run test
```

## Utilizando a API

A aplicação disponibiliza um serviço para criação e listagem de naves espaciais.

### Basic **Authorization** API System

A API utiliza o sistema básico de **_autorização_**. Ele valida se quem está fazendo um pedido tem acesso ou não ao recurso. Diferente de um sistema de **_autenticação_** que identificaria permissões de acesso à recursos por usuários.

Os recursos marcados como _protected_ precisam necessariamente ter o header:

```
 "Authorization: Basic <coloque_seu_token_aqui>"
```

Exemplo de resposta para pedidos não autorizados:

```
{
    "error": {
        "status": 401,
        "message": "Unauthorized, please check your Authorization Token"
    }
}
```

### Endpoints

`GET /starship` - _protected_

É usado para listagem de naves espaciais.

Exemplo de requisição:

```
curl -D- \
   -X GET \
   -H "Authorization: Basic eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMjg5LCJleHAiOjE2MDY1OTQ4NTd9.Nxn8z19u9YrT9ctpYG855YE66-R-BODjBssNnAEVxNA" \
   -H "Content-Type: application/json" \
   "localhost:3000/starship"
```

Exemplo de resposta:

```
{
    "data": [
        {
            "name": "Star Destroyer",
            "model": "Imperial I-class Star Destroyer",
            "manufacturer": "Gallofree Yards, Inc.",
            "passengers": 0,
            "people": [
                {
                    "id": 1,
                    "name": "Luke Skywalker",
                    "gender": "male"
                },
                {
                    "id": 4,
                    "name": "Darth Vader",
                    "gender": "male"
                }
            ]
        },
        {
            "name": "Sentinel-class landing craft",
            "model": "Sentinel-class landing craft",
            "manufacturer": "Gallofree Yards, Inc.",
            "passengers": 75,
            "people": [
                {
                    "id": 3,
                    "name": "R2-D2",
                    "gender": "n/a"
                },
                {
                    "id": 6,
                    "name": "Owen Lars",
                    "gender": "male"
                }
            ]
        }
    ],
    "status": 200,
    "message": "Starships successfully listed"
}
```

`POST /starship`

Responsável por criar uma nova nave espacial. Ela deve seguir a estrutura de objeto a seguir:
| Campo | Tipo | Obrigatório |Descrição |
|--|--|--|--|
| name | string | sim | Nome da Nave |
| model | string | sim |Modelo da Nave |
| manufacturer | string | sim | Construtora |
| passengers | number | sim | Numero de passageiros |
| pilotsIds | [number] | não | Array de ids dos pilotos da nave |

Exemplo de requisição:

```
curl -d '{ "name":"navigator4", "model":"s9", "manufacturer":"nokia", "passengers":"1", "pilotsIds":[1, 3]}' \
    -H "Content-Type: application/json" \
    -X POST http://localhost:3000/starship

```

Exemplo de resposta:

```
{
    "data": {
        "id": 31,
        "name": "navigator4",
        "model": "s9",
        "manufacturer": "nokia",
        "passengers": 1,
        "createdAt": "2020-10-04T17:01:49.499Z",
        "updatedAt": "2020-10-04T17:01:49.499Z",
        "people": [
            {
                "id": 1,
                "name": "Luke Skywalker",
                "gender": "male"
            },
            {
                "id": 3,
                "name": "R2-D2",
                "gender": "n/a"
            }
        ]
    },
    "status": 200,
    "message": "Starship successfully created"
}
```

`Erros`

Item duplicado:

```
{
    "error": {
        "status": 409,
        "message": "Starship already exists"
    }
}
```

Parametros Inválido:

```
{
    "error": {
        "status": 422,
        "message": "Pilots with ids 221 not found on database"
    }
}
```

```
{
    "error": {
        "status": 422,
        "message": "passengers is a required field"
    }
}
```

Recurso não encontrado

```
{
    "error": {
        "status": 404,
        "message": "Recurso não encontrado."
    }
}
```

## Arquitetura da aplicação

Dividi a aplicação em 3 principais pontos:

### Routes e Middlewares

Responsável por identificar os recursos expostos para o mundo em nossa api e validar os acessos a mesma, Atualmente estamos usando um sistema
simples de autorização, porém, ao passar para um sistema de autenticação essa parte da aplicação tende a crescer.

### Controllers

Responsável por guardar todas as regras de negócio da aplicação, exemplo: caso a gente queira ao criar
uma nova nave espacial acionar outros serviços, enviar uma mensagem pra uma fila, ou um e-mail de
confirmação pro usuário, todas essas ações complementares à criação de uma nave ficariam no controller.

Também é responsável por todo o gerenciamento de erros customizados gerados pelas classes utilizadas
no mesmo.

### Models

Pensando em garantir uma maior manutenabilidade e testabilidade os models são separados em 3 partes:

1. Classes: Responsáveis por guardar a lógica de manipulação de cada entidade, por ex: para criar uma nave precisamos
   saber se ela ja existe, pra evitarmos enviarmos pro banco um dado que ja sabemos que dará erro de duplicidade. Precisamos
   saber se os pilotos daquela nave existem. Precisam também saber se os dados enviados para criação são válidos e além disso depois
   de criarmos a nave precisamos garantir que os respectivos pilotos estarão associados corretamente a ela, caso contrário será feito um rollback.

2. Interfaces: Responsável por guardar as entidades que estamos nos relacionando, geralmente um banco de dados porém poderia ser qualquer outro serviço
   de fornecimento/envio/criação de dados, como um sdk da aws de algum serviço. Ele precisa cumprir o contrato de implentações dos métodos da sua classe
   da pasta "classes" abstraindo toda logica e especialização relacionada ao database/serviço.

3. Validations: Responsável por guardar as validações de cada entidade, eles são mutáveis e estão diretamente ligados as classes e interfaces pois fazem
   cumprir os requisitos especificados por elas de acordo com as necessidades da api.

## Test de Stress

Para rodar o teste de stress com o LoadTest basta executar os seguintes comandos:

```
npm install -g loadtest
loadtest -H "Authorization: Basic <seu_token_aqui>" -n 100 -c 100 --rps 1000 http://localhost:3000/starship
```

#### Resultados:

![loadtest](docs/loadtest_result.png)

### Observações

Pendências:

- [ ] Desenho de arquitetura proposta pra aplicação junto com micro serviço de autenticação.
- [ ] Docker compose pra facilitar a criação de ambiente de test e dev.
- [ ] Completar o CRUD de starships.
