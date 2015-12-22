"use strict";
const confit = require('confit');
const P = require('bluebird');

P.promisifyAll(confit(__dirname)).createAsync().then(function(config) {
  const db = require('knex')({
    client: 'pg',
    connection: config.get('connection'),
    pool: config.get('pool')
  });

  return db('users').where('created > now() - interval \'1 hour\'').then(console.log)
}).catch(function(err) {
  console.warn(err.stack);
  process.exit(1);
})

