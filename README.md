# Express Sequelize Resource

[![npm version](https://badge.fury.io/js/%40sintese%2Fexpress-sequelize-resource.svg)](https://badge.fury.io/js/%40sintese%2Fexpress-sequelize-resource)
[![Software License][ico-license]](LICENSE.md)

Especificação de rotas CRUD ExpressJS com Sequelize

## Instalando

Via npm

``` bash
$ npm i @sintese/express-sequelize-resource
```

## Usando

O uso se a partir da definição de rotas no ExpressJS da seguinte forma: 

``` nodejs
const express = require('express')

const {  
  find,
  post,
  patch,
  get,
  destroy
} = require('@sintese/express-sequelize-resource');

const app = express()
const router = express.Router();

/**
 * @route {GET} / 
 * @description Lista registros cadastrados
 */
router.get('/', find(Model));

/**
 * @route {POST} / 
 * @description Cadastra novo registro
 */
router.post('/', post(Model));

/**
 * @route {GET} /:id
 * @description Retorna registro por seu identificador
 */
router.get('/:id', get(Model));

/**
 * @route {DELETE} /:id
 * @description Remove registro por seu identificador
 */
router.delete('/:id', destroy(Model));

/**
 * @route {PATCH} /:id
 * @description Atualização de registro por seu identificador
 */
router.patch('/:id', patch(Model));
```

## Change log

Modificações recentes são registradas no [CHANGELOG](CHANGELOG.md)

## Contribuindo

Dúvidas, contribuições e sugestões são muito bem vidas.

## Créditos

- [Rafael Becker][link-author]

## Licença

Esse pacote é disponibilizado sob a licença [MIT](LICENSE.md).

[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[link-author]: https://github.com/rafaelbeecker