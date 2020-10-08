
const senha = "$2a$10$T62jqjOvSQppS3jismp/Re91NofKATfJSSFdQwAfGEsADzEfdeE6."

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, permission: false, name: 'dayan', email: 'dayan@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 2, permission: false, name: 'israel', email: 'israel@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 3, permission: false, name: 'brandon', email: 'brandon@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 4, permission: false, name: 'willian', email: 'willian@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 5, permission: false, name: 'dany', email: 'dany@gmail.com', passwordHash: senha, phone:'11111111111'},
        {id: 6, permission: true, name: 'suporte', email: 'suporte@gmail.com', passwordHash: senha, phone:'11111111111'}
      ]);
    });
};
