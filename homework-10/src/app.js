const knexMigrate = require('knex-migrate');
const startServer = require('./utils/startServer');

(async () => {
  await knexMigrate('up', {})
    .then((res) => {
      console.log(res);
      console.log('DB connection ok ');
      startServer();
    })
    .catch((error) => console.log('no connection DB', error.message));
})();
