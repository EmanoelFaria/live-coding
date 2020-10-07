# Starships API + Auth Service

## Requisitos

- [Docker](https://www.docker.com/) versão 19.x
- [Docker Compose](https://docs.docker.com/compose/) versão 1.26+

## Rodando o projeto

Clonar o repositório e mover para pasta princripal

```
git clone https://github.com/EmanoelFaria/live-coding.git
cd live-coding
```

Nas pastas /auth e /api existem arquivos com o nome .env.example, use eles de referencia para criar o .env.development nas suas respectivas pastas. Garanta que você terá um `/auth/.env.development` e um `/api/.env.development` antes de prosseguir.

Para iniciar a api basta executar o seguinte comando na raiz do projeto (dependendo da forma que tenha sido instalado o docker/docker-compose o comando sudo deverá ser retirado):

```
docker-compose up --build
```

Espere a mensagem `"FINISH LOADING APPLICATION"` aparecer no seu console antes de utilizar a API.

Para parar o serviço basta executar `ctrl+c` ou seguinte comando:

```
docker-compose down
```

## Utilizando a API

A aplicação disponibiliza:

- um serviço para criação e listagem de naves espaciais.
- um serviço para criação de usuários
- gerenciamento de permissões de acesso de usuários a recursos da API

### Basic **Authorization** API System

A API utiliza o sistema básico de **_autorização_** para listar e criar naves espaciais. Ele valida se quem está fazendo um pedido tem acesso ou não ao recurso.

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

### Internal Service Autorization API System

A API tem rotas que só são acessiveis por serviços internos, comunição restrita apenas a serviços internos

Os recursos marcados como _internal service_ precisam necessariamente ter o header:

```
 "Internal-Service: <coloque_seu_token_aqui>"
```

Exemplo de resposta para pedidos internos não autorizados:

```
{
    "error": {
        "status": 500,
        "message": "Invalid Internal Service Request"
    }
}
```

### Testando API com o Postman

Segue abaixo o link do postman, com todos os requests preparados, pronto para testar:
https://www.getpostman.com/collections/74728953aa2d0c3cc2db

Os requests abaixo estão dentro da pasta `docker-compose paths` do link acima.

1. `create user` - responsável por criar um novo usuário com suas respectivas permissões
2. `sign in with created user` - responsável por criar um access token baseado no usuário para utilização da api.
3. `get starships` - nesse endpoint é necessário adicionar no header o seu access token gerado no passo anterior conforme as instrucoes `Basic **Authorization** API System` descritas no tópico anterior. Aqui você terá acesso a lista de todas as starships
4. `create starship` - também é necessário adicionar no access token no header. Aqui você conseguirá criar novas naves espaciais com seus respectivos pilotos.
5. `update user permissions` - vale lembrar que depois de atualizar as permissoes de acesso do usuário será necessário gerar um novo access token (passo 2) para utilizar novamente a API.

### Endpoints - API

`GET <endpoint_api>/starship` - _protected_

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

`POST <endpoint_api>/starship` - _protected_

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

### Endpoints - Auth - micro serviço

`POST <endpoint_auth>/auth/signin`

Resposável por gerar um access token para o usuário poder utilizar os seus recursos da API. Ele invalida qualquer outro access token anteriormente gerado por segurança e garantir que não tenha acessos duplicados

| Campo    | Tipo   | Obrigatório | Descrição        |
| -------- | ------ | ----------- | ---------------- |
| username | string | sim         | Username         |
| password | string | sim         | Senha do usuário |

Exemplo de requisição:

```
{
    "username": "emanoel29",
    "password": "senhasegura"
}
```

Exemplo de resposta:

```
{
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW5vZWwyOSIsInBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZSI6InN0YXJzaGlwIiwibWV0aG9kIjoiUE9TVCJ9LHsicmVzb3VyY2UiOiJzdGFyc2hpcCIsIm1ldGhvZCI6IkdFVCJ9XSwiaWF0IjoxNjAyMDMyNDYxfQ.imTqWVWWs0OmpfZJv7y_f8Wmg1KIK-eEijJZ5DzSyaA"
    },
    "status": 200,
    "message": "New user successfully created"
}
```

`PUT <endpoint_auth>/auth/user/:id`

Responsável por atualizar as permissões de determinado usuário

| Campo       | Tipo         | Obrigatório | Descrição           |
| ----------- | ------------ | ----------- | ------------------- |
| permissions | [permission] | sim         | Array de permissões |

Permission

| Campo    | Tipo   | Obrigatório | Descrição        |
| -------- | ------ | ----------- | ---------------- |
| method   | string | sim         | método           |
| resource | string | sim         | recurso/endpoint |

Exemplo de requisição

```
{
    "permissions":[{
        "method":"POST",
        "resource": "starship"
    },{
        "method":"GET",
        "resource": "starship"
    }]
}
```

Exemplo de resposta:

```
{
    "data": {
        "username": "emanoel26",
        "permissions": [
            {
                "resource": "starship",
                "method": "POST"
            },
            {
                "resource": "starship",
                "method": "GET"
            }
        ]
    },
    "status": 200,
    "message": "User successfully updated"
}
```

`POST <endpoint_auth>/auth/signup`
Responsável por criar um novo usuário com suas respectivas permissões de recursos da API

| Campo       | Tipo         | Obrigatório | Descrição           |
| ----------- | ------------ | ----------- | ------------------- |
| username    | string       | sim         | Username            |
| password    | string       | sim         | Senha do usuário    |
| permissions | [permission] | sim         | Array de permissões |

Permission

| Campo    | Tipo   | Obrigatório | Descrição        |
| -------- | ------ | ----------- | ---------------- |
| method   | string | sim         | método           |
| resource | string | sim         | recurso/endpoint |

Exemplo de requisição:

```
{
    "username": "emanoel29",
    "password": "senhasegura",
    "permissions":[{
        "method":"POST",
        "resource": "starship"
    },{
        "method":"GET",
        "resource": "starship"
    }]
}
```

Exemplo de resposta:

```
{
    "data": {
        "username": "emanoel29",
        "permissions": [
            {
                "method": "POST",
                "resource": "starship"
            },
            {
                "method": "GET",
                "resource": "starship"
            }
        ]
    },
    "status": 200,
    "message": "New user successfully created"
}
```

`POST <endpoint_auth>/auth/validate` - _internal service_

Endpoint apenas para validação interna da API para verificar se o usuário tem permissão de acessar o recurso pedido.

| Campo       | Tipo   | Obrigatório | Descrição                   |
| ----------- | ------ | ----------- | --------------------------- |
| accessToken | string | sim         | Access Token para validação |
| method      | string | sim         | Método para validação       |
| resource    | string | sim         | Recurso para validação      |

Exemplo de requisição:

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW5vZWwyNiIsInBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZSI6InN0YXJzaGlwIiwibWV0aG9kIjoiUE9TVCJ9LHsicmVzb3VyY2UiOiJzdGFyc2hpcCIsIm1ldGhvZCI6IkdFVCJ9XSwiaWF0IjoxNjAyMDE4MTU3fQ.BopWnoKIPdBhS-dNr-NEVSrlxTZc4OIzAadiWDPD9HU",
    "method":"GET",
    "resource":"starship"
}
```

Exemplo de resposta:

```
{
    "data": {},
    "status": 200,
    "message": "/GET starship Authorized"
}
```

Erros:

```
{
    "error": {
        "status": 500,
        "message": "something went wrong"
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

## Rodando os testes

Mova para a pasta do serviço que deseja testar e rode os seguintes comandos:

```
# Instale as dependências
npm install

# Crie o banco de dados
NODE_ENV=test npx sequelize-cli db:create

# Rode os testes
npm run test
```

## Teste de Carga

Para rodar o teste de stress com o LoadTest basta executar os seguintes comandos:

```
npm install -g loadtest
loadtest -H "Authorization: Basic <seu_token_aqui>" -n 100 -c 100 --rps 1000 http://localhost:3000/starship
```

#### Resultados:

![loadtest](docs/loadtest_result.png)

# Arquitetura

### Modelo 1

![arquitetura](docs/architeture1.jpg)

### Modelo 2

![arquitetura_autoscaling](docs/architeture2.jpg)

A arquitetura escolhida para versão v2.0.0 foi a primeira, mas também está pronta para atender o segundo modelo.

#### API

A api foi desenvolvida pensando em atender no mínimo 1000 requisições/segundo por nó, podendo ser escalada quando necessário.

Ela em suas rotas o mesmo sistema de autenticação de APIs como facebook e twitter usando um Access Token que garante/restringe o uso de recursos específicos da API.

Ela se comunica internamente com o micro serviço de Autenticação e Autorização para validar os pedidos.

Hoje ela está dependente do micro serviço de Autenticação, porém, no nivel que a aplicação se encontra hoje não é um problema.

Com o volume de requests aumentando podemos abordar estratégias de inconsistencia eventual para garantir um menor tempo de resposta com dados em memória ou armazenados localmente e garantir 0 downtime em caso de queda/erro do serviço de autenticação, tirando assim toda dependência do mesmo.

#### AUTH - Micro serviço de Autenticação

Foi desenvolvido pensando em tanto Autenticar e gerenciar permissoes de usuarios isso é, conseguimos cadastrar novos usuários
cada um com seu respectivo usuário e senha e permissoes de recursos da API configuradas.

Para autorização e uso da API é necessário cada usuário criar seu Access Token para consumo da API.

#### Nginx - Load Balancer

Escolhi utilizar o [_Nginx_](https://www.nginx.com/) como Load Balancer pois é uma solução gratuita ja validada que atenderia muito bem a aplicação. Apesar disso poderiamos utilizar aplicações de terceiros como [_AWS Elastic Load Balancer_](https://aws.amazon.com/pt/elasticloadbalancing/).

### Observações
