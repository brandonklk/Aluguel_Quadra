
const senha = "$2a$10$T62jqjOvSQppS3jismp/Re91NofKATfJSSFdQwAfGEsADzEfdeE6."

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'dayan', email: 'dayan@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 2, name: 'israel', email: 'israel@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 3, name: 'brandon', email: 'brandon@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 4, name: 'willian', email: 'willian@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 5, name: 'dany', email: 'dany@gmail.com', passwordHash: senha, phone:'11111111111'}
      ]);
    });
};
