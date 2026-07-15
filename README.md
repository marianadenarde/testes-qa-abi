# Testes QA - ServeRest

Testes automatizados com Cypress e JavaScript para a aplicação ServeRest (front e API).

Front: https://front.serverest.dev/
API: https://serverest.dev/

## Como rodar

npm install
npx cypress open

Ou direto no terminal:

npx cypress run

Só os testes de front:
npm run test:e2e

Só os testes de API:
npm run test:api

## O que foi testado

Frontend:
- Admin cadastra um produto e o consumidor consegue encontrar e adicionar esse produto na lista de compras
- Admin cadastra um novo usuário e ele aparece certinho na listagem
- Consumidor pesquisa um produto e adiciona na lista

API:
- Cadastro de usuário + login, validando token e persistência
- Cadastro de produto autenticado, validando que o produto foi salvo mesmo
- Fluxo completo de carrinho: cria admin, cria produto, cria consumidor, adiciona ao carrinho e confere se persistiu certo

## Estrutura

cypress/support/pages -> Page Objects do front
cypress/support/api -> classes de request da API
cypress/support/helpers -> geração de usuário/produto com Faker (dados sempre diferentes, evita conflito de email/nome duplicado)
cypress/e2e -> os testes em si (frontend e api)

## Tecnologias

Cypress + Faker