'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Requests', [
      {
        image: 'e188c395-d347-4a54-8577-7b2ff05bcf40.jpg',
        description: 'My wife love sthis color dress and looks fantastic in it!  I hope you can find something like it!',
        apparelChoice: 'dress,other',
        isCompleted: false,
        userId: 1,
        designerId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: '709f8d41-a778-4e6a-8901-b0d9da524e52.jpg',
        description: 'My son wears this jacket all the time.  He loves it, and wants some like it in other colors.  He also loves blue dress shirts!',
        apparelChoice: 'outerwear,shirt',
        isCompleted: false,
        userId: 1,
        designerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Requests', {});
  }
};