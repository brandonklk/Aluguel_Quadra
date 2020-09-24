
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('schedules').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('schedules').insert([
        {id: 1, date: '01/09/2020', time: '08:00', user_id: 1, tennis_court_id: 1},
        {id: 2, date: '02/09/2020', time: '09:00', user_id: 1, tennis_court_id: 1},
        {id: 3, date: '03/09/2020', time: '10:00', user_id: 1, tennis_court_id: 1},

        {id: 4, date: '04/09/2020', time: '08:00', user_id: 2, tennis_court_id: 1},
        {id: 5, date: '05/09/2020', time: '09:00', user_id: 2, tennis_court_id: 1},
        {id: 6, date: '06/09/2020', time: '10:00', user_id: 2, tennis_court_id: 1},

        {id: 7, date: '04/09/2020', time: '08:00', user_id: 3, tennis_court_id: 1},
        {id: 8, date: '05/09/2020', time: '09:00', user_id: 3, tennis_court_id: 1},
        {id: 9, date: '06/09/2020', time: '10:00', user_id: 3, tennis_court_id: 1},

        {id: 10, date: '04/09/2020', time: '08:00', user_id: 4, tennis_court_id: 1},
        {id: 11, date: '05/09/2020', time: '09:00', user_id: 4, tennis_court_id: 1},
        {id: 12, date: '06/09/2020', time: '10:00', user_id: 4, tennis_court_id: 1},

        {id: 13, date: '04/09/2020', time: '08:00', user_id: 5, tennis_court_id: 1},
        {id: 14, date: '05/09/2020', time: '09:00', user_id: 5, tennis_court_id: 1},
        {id: 15, date: '06/09/2020', time: '10:00', user_id: 5, tennis_court_id: 1},
      ]);
    });
};
