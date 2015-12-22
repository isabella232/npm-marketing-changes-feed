"use strict";
const confit = require('confit');
const P = require('bluebird');
const knex = require('knex');

P.promisifyAll(confit(__dirname)).createAsync().then(function(config) {
  const db = knex({
    client: 'pg',
    connection: config.get('connection'),
    pool: config.get('pool')
  });

  return db('users').where('created', '>', knex.raw('now() - interval \'1 hour\'')).then(console.log)
}).catch(function(err) {
  console.warn(err.stack);
  process.exit(1);
})

