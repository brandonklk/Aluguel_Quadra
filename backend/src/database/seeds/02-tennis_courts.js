
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tennis_courts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tennis_courts').insert([
        {id: 1, name: 'Quadra A', value: 50.00, owner_id: 1},
        {id: 2, name: 'Quadra B', value: 50.00  ,owner_id: 1},
        {id: 3, name: 'Quadra comberta', value: 100.00 ,owner_id: 1}
      ]);
    });
};
