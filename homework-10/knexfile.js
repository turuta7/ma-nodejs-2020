require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DBHOST,
      port: process.env.DBPORT,
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASSWD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },
};
