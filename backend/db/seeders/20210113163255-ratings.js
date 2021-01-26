'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ratings', [
    {
      designerRating: 4,
      userId: 1,
      designerId: 2,
      comment: 'Recommended the best clothes for my mom.  She loved her present thank you so much!!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 4,
      designerId: 2,
      comment: 'Thank you for the help',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 3,
      userId: 6,
      designerId: 3,
      comment: 'Did a fairly good job, but response at times was slow',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 7,
      designerId: 2,
      comment: 'LOVE LOVE LOVE THESE CLOTHES!! YAY!!!',
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
      comment: 'I\'m terrible at picking out clothes, I would have gotten some terrible gift if not for your help.  Thank you a million times over.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 4,
      designerId: 11,
      comment: 'What is the goth style?  I have no idea, but my son is into this style and loves all his clothes a certain way.  Thanks for helping me get the perfect gift for Christmas for him.',
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
      comment: 'You\'re the best!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 9,
      designerId: 11,
      comment: 'I\'m so happy with these recommendations, thank you!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 10,
      designerId: 3,
      comment: 'You\'re the best.  Thank you so much and I would use them again if I ever needed clothes for any family member or friend.',
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
      comment: 'An amazing designer with so much personality.  I loved all the recommendations and they were quick and efficient with responses',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 6,
      designerId: 5,
      comment: 'Such a great service and great designer!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 4,
      userId: 7,
      designerId: 3,
      comment: 'Thanks',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      designerRating: 5,
      userId: 9,
      designerId: 5,
      comment: 'One of the best designer I\'ve ever met.',
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
      comment: 'Not a great experience.  Was so to respond and my daughter did not really like the clothes',
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
      comment: 'Incredible!  Perfect clothes for my brother, thanks so much!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', {})
  }
};
