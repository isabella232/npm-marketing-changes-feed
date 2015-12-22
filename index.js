"use strict";
const confit = require('confit');

confit(__dirname).create(function(err, config) {
  const db = require('knex')({
    client: 'pg',
    connection: config.get('connection'),
    pool: config.get('pool')
  });

  db('users').where('created > now() - interval \'1 hour\'').then(console.log)
})

