FUTAPI
Sistema mobile desenvolvido em React Native integrado com API Laravel para gerenciamento de times de futebol.

Funcionalidades
Sistema de Autenticação
O aplicativo possui autenticação completa utilizando Laravel Sanctum.

Funcionalidades:
Cadastro de usuário

Login de usuário

Armazenamento de token com AsyncStorage

Rotas protegidas

Controle de autenticação

Gerenciamento de Times
O sistema permite o gerenciamento completo dos times cadastrados.

Criar Time
O usuário autenticado pode cadastrar um novo time contendo:

Nome do time

Ano de fundação

Estado

Quantidade de títulos

Os dados são enviados para a API utilizando Axios.

Listagem de Times
Todos os times cadastrados são exibidos em uma lista dinâmica utilizando FlatList.

Informações exibidas:
Nome do time

Ano

Estado

Quantidade de títulos

Editar Time
O usuário pode editar os dados de um time já cadastrado.

Alterações disponíveis:
Nome

Ano

Estado

Quantidade de títulos

A edição é realizada através de requisição PUT para a API Laravel.

Deletar Time
O usuário também pode remover um time cadastrado.

Funcionalidades:
Confirmação antes de deletar

Requisição DELETE para a API

Atualização da lista após exclusão

Tecnologias Utilizadas
Frontend (Mobile)
React Native

Expo

Axios

AsyncStorage

React Navigation

Backend (API)
Laravel

Laravel Sanctum

MySQL

Eloquent ORM

Comunicação com API
A comunicação entre o aplicativo e o backend foi feita utilizando Axios.

Métodos utilizados:
GET → listar times

POST → criar times

PUT → editar times

DELETE → deletar times

Segurança
O sistema utiliza autenticação por token utilizando Laravel Sanctum.

Recursos:
Middleware auth:sanctum

Verificação de usuário autenticado

Proteção de rotas

Controle de permissões

Interface
O aplicativo possui interface personalizada com tema escuro e visual inspirado em futebol.

Características:
Background personalizado

Botões estilizados

Inputs personalizados

Modal de detalhes

Navegação entre telas

Estrutura do Projeto
Telas principais:
Welcome

Login

Cadastro

Lista

CriarTime

EditarTime

Splash

Cep

Funcionalidades Extras
Loading durante requisições

Tratamento de erros

Alertas personalizados

Navegação dinâmica

Atualização em tempo real

Desenvolvedor
Projeto desenvolvido para fins acadêmicos utilizando React Native e Laravel.

