exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table
      .string('login', 255)
      .notNullable()
      .defaultTo('');
    table
      .string('password', 255)
      .notNullable()
      .defaultTo('');
    table
      .string('token', 255)
      .notNullable()
      .defaultTo('');
    table.unique(['login']);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};

exports.config = { transaction: false };
