'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ratings', [
    {
      designerRating: 4,
      userId: 1,
      designerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 4,
      designerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 3,
      userId: 6,
      designerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 7,
      designerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 3,
      userId: 9,
      designerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 1,
      designerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 4,
      designerId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 2,
      userId: 6,
      designerId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 7,
      designerId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 9,
      designerId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 10,
      designerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 3,
      userId: 1,
      designerId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 4,
      designerId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 6,
      designerId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 7,
      designerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 9,
      designerId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 3,
      userId: 10,
      designerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 1,
      userId: 1,
      designerId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 4,
      designerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 10,
      designerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', {})
  }
};
