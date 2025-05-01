const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Carts', [
        {
          id: uuidv4(),
          user_id: '6f764583-95bc-4253-b82c-b3faa03400dc', 
          product_id: '20843a6a-2e31-41e3-ac17-8c06b101b6aa', 
          quantity: 1,
          price: 130,
          total: 130, 
          slug: slugify('user1-product1', { lower: true }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          user_id: '6f764583-95bc-4253-b82c-b3faa03400dc', 
          product_id: 'c6dc9023-94a2-4bf8-b8b6-4d680964ea40', 
          quantity: 1,
          price: 1500,
          total: 1500, 
          slug: slugify('user2-product2', { lower: true }),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    } catch (error) {
      console.error('Error during cart seeding:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
