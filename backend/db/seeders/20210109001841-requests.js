'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Requests', [
      {
        image: 'https://dress-em-up.s3.us-west-1.amazonaws.com/fafb8dff-6f18-4634-8ffc-8c56eb752415.png?AWSAccessKeyId=AKIAISW47K5FXEIWWESA&Expires=1610139368&Signature=3KKJI8uEylybnXg%2BCsfnrJFmXIg%3D',
        description: 'I LOVE MY WIFE AND WANT TO GET HER THIS DRESS',
        apparelChoice: 'outerwear,pants,',
        userId: 1,
        designerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://dress-em-up.s3.us-west-1.amazonaws.com/46c01624-beeb-43b6-871c-cdeb67c3dccd.png?AWSAccessKeyId=AKIAISW47K5FXEIWWESA&Expires=1610142531&Signature=CJ3LzycgeAtni8167oQHzJUZlag%3D',
        description: 'The great gal in the world!!!!!',
        apparelChoice: 'dress,outerwear,',
        userId: 1,
        designerId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Requests', {});
  }
};