'use strict';


const faker = require("faker");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();
const hashedPassword = bcrypt.hashSync("password", salt);

//#2
 let users = [];
 let roles = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2]

 for(let i = 1 ; i < 15 ; i++){
   users.push({
     email: faker.internet.email(),
     password: hashedPassword,
     role: roles[i],
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    console.log(users);
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
