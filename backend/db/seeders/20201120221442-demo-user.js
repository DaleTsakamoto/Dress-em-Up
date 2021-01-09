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
        avatar: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2200&q=80',
        bio: faker.lorem.paragraph(),
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
        hashedPassword: bcrypt.hashSync('password'),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2176&q=80',
        bio: faker.lorem.paragraph(),
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
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'https://images.unsplash.com/photo-1520974735194-9e0ce82759fc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
        bio: faker.lorem.paragraph(),
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
        avatar: 'https://images.unsplash.com/photo-1525879000488-bff3b1c387cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2134&q=80',
        bio: faker.lorem.paragraph(),
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
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'https://images.unsplash.com/photo-1604961410267-9f76682d25e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2438&q=80',
        bio: faker.lorem.paragraph(),
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
        avatar: 'https://images.unsplash.com/photo-1525873765963-8931ab571545?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=792&q=80',
        bio: faker.lorem.paragraph(),
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
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        bio: faker.lorem.paragraph(),
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
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        bio: faker.lorem.paragraph(),
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
        avatar: 'https://images.unsplash.com/photo-1505302548595-187075e7cdb1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2467&q=80',
        bio: faker.lorem.paragraph(),
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
        avatar: 'https://images.unsplash.com/photo-1528151406837-4745fbcd9f70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        bio: faker.lorem.paragraph(),
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
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: 'https://images.unsplash.com/photo-1533689476487-034f57831a58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80',
        bio: faker.lorem.paragraph(),
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