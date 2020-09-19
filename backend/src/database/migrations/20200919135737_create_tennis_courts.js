exports.up = function(knex) {
    return knex.schema.createTable('tennis_courts', function(table) {
        table.increments('id');
        table.string('name').unique().notNullable();
        table.integer('owner_id').unsigned();
        table.foreign('owner_id').references("users.id");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tennis_courts');
};