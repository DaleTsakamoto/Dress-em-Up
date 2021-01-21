'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo_user',
        userType: true,
        hashedPassword: bcrypt.hashSync('password'),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'f9e91364-e78c-44f5-88b9-4799a06d5942.jpg',
        address: '5208 Timber Creek Ct',
        city: 'Antioch',
        state: 'CA',
        zipCode: 94531,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'demo@user2.io',
        username: 'Demo_designer',
        userType: false,
        active: true,
        hashedPassword: bcrypt.hashSync('password'),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'bbf7d0b8-ba40-4d5a-9b73-e965ebe71e97.jpg',
        bio: 'I designed my first dress in elementary school when I drew a picture of a dress I wanted to wear and cut it out of my mom\'s curtains.  I love helping my friends and family find clothes to wear, and would love helping you as well.  Let\'s get you dressed in clothes you or your loved ones will love!',
        education: 'California College of the Arts',
        address: '1315 Acacia St',
        city: 'Pittsburg',
        state: 'CA',
        zipCode: 94565,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: false,
        active: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'ab2ad4f2-6324-43d0-a211-2a21c35ad2be.jpg',
        bio: 'I go to thrift stores every weekend to find the best vintage clothes for myself and my friends.  I have been findingg treasures for my friends and family since high school and know i can find you clothes you will love also.',
        education: 'University of San Francisco',
        address: '153 Curtis Dr',
        city: 'BrentWood',
        state: 'CA',
        zipCode: 94513,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'd056829b-eb15-4fee-932e-c9cef7e9aa96.jpg',
        address: '1650 Delta Rd',
        city: 'Knightsen',
        state: 'CA',
        zipCode: 94548,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: false,
        active: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: '3a7dd037-6d57-44c5-b343-f84b10b6f405.jpg',
        bio: "I graduated from the Rhose Island School of Designg with highest honors.  I have worked with several designers in Paris Fashion Week and have designed some of the most notable styles on the runway.  I would classify my style as refined sheek and can dress anyone up in the most popular modern trends",
        education: 'Rhode Island School of Design',
        address: '1445 Oxford St',
        city: 'Berkeley',
        state: 'CA',
        zipCode: 94709,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'd318a6da-0a54-4bfd-81f2-eecb822d7285.jpg',
        address: '5592 Taft Ave',
        city: 'Oakland',
        state: 'CA',
        zipCode: 94618,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: '4009f5a4-523a-40f5-b7be-dbd59efa883b.jpg',
        address: '51 Overlook Ct',
        city: 'Walnut Creek',
        state: 'CA',
        zipCode: 94597,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: false,
        active: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: '2eb73d1b-4da4-4e3e-98ba-d7bb2d21a369.jpg',
        bio: "Fabric to me is how money is to a Wall Street Investor.  I love it more than I love anything or anyone else.  There is nothing like feeling different fabrics as you go from shop to shop imagining all you can do with it.  I create designs sewing in my basement on the weekends and know I can find the perfect clothes for you.",
        education: 'School of the Art Institute of Chicago',
        address: '2624 Larkey Ln',
        city: 'Walnut Creek',
        state: 'CA',
        zipCode: 94597,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: '9d0d16e6-1c7a-403d-8b8b-4c82f3b95e99.jpg',
        address: '26412 Ganiza',
        city: 'Mission Viejo',
        state: 'CA',
        zipCode: 92692,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: '2a28aef3-434a-4928-92e7-b7d0efaac131.jpg',
        address: '343 Esther St',
        city: 'Costa Mesa',
        state: 'CA',
        zipCode: 92627,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        userType: false,
        active: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'cf0d320b-0c9a-4aa1-8279-6a9efdb0ef72.jpg',
        bio: "My friends told me long ago that I had the best eye for every type of style and clothing when I won best costume design at our high school musical.  I always keep the wearer in mind when designing and choosing a perfect style.  You will be my top priority for finding you the best clothes.",
        education: 'Pratt Institute',
        address: '2 Fort Sumter',
        city: 'Irvine',
        state: 'CA',
        zipCode: 92620,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo_user', 'Demo_designer'] }
    }, {});
  }
};