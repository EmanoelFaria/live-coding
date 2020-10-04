<h1 align="center">Live Coding Interview</h1>

## Prerequisites

- [Node.JS](https://nodejs.org/) version 10.13
- [PostgresSQL](https://www.postgresql.org/) version 12.4

## Running Project

```
# Clone this repo
git clone https://github.com/EmanoelFaria/live-coding.git

# Move to project folder
cd live-coding

# Install dependencies
npm install

# create database
NODE_ENV=development npx sequelize-cli db:create && \
  NODE_ENV=development npx sequelize-cli db:migrate && \
  NODE_ENV=development npx sequelize-cli db:seed:all


# Run service in development mode
npm run dev
```

## Rodando os testes

```
npm run test
```

## Utilizando a API

A aplicação disponibiliza um serviço para criação e listagem de naves espaciais.

### Basic **Authorization** API System

A API utiliza o sistema básico de **_autorização_**. Ele valida se quem está fazendo um pedido tem acesso ou não ao recurso. Diferente de um sistema de **_autenticação_** que identificaria permissoes de acesso a recursos por usuários.

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

É usado para listagem de naves espaciais. Ele usa o sistema de Autorização Básico de API.

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
| pilotsIds | [number] | não | array de ids dos pilotos da nave |

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
