exports.up = function(knex) {
    return knex.schema.createTable('schedules', function(table) {
        table.increments('id');
        table.string('date').notNullable();
        table.string('time').notNullable();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references("users.id");
        table.integer('tennis_court_id').unsigned();
        table.foreign('tennis_court_id').references("tennis_courts.id");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('schedules');
};