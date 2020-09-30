exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('passwordHash').notNullable();
      table.string('phone').notNullable();
      table.string('token');
      table.string('image_base_64');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };