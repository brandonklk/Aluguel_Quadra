# Back-end aluguel de quadra

## Tecnologias

##### Utilizado

  - Node
  - Knex
  - Jest
  - Nodemon
  - JWT Token

## Como rodar

- Realizar o downlod do Node
- Rodar `npm install` e `npm start`

## Novas migrations
- `npx knex migrate:make nomeDaTabela`
- `npx knex migrate:latest`

## Rollback na ultima tabela(migrate) criada

- `npx knex migrate:rollback`

## Criar novo arquivo de seed
knex seed:make nome_seed

## Colocar os dados em base
knex seed:run 