'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
        fullName: 'Petar Petrovic',
        password: await bcrypt.hash('test123', 12),
        email: 'petar@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf26e',
        fullName: 'Kristina Markovic',
        password: await bcrypt.hash('test123', 12),
        email: 'kristina@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
