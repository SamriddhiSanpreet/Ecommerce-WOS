const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Subcategories', [
        {
          id: uuidv4(),
          categoryId: '37b81039-f253-4a12-88a8-fa213083836a',  
          name: 'Mobile Phones',
          slug: slugify('Mobile Phones', { lower: true }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          categoryId: '37b81039-f253-4a12-88a8-fa213083836a', 
          name: 'Laptops',
          slug: slugify('Laptops', { lower: true }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          categoryId: '1b2198a5-01bf-418a-af19-c253be608c6f', 
          name: 'Shirts',
          slug: slugify('Shirts', { lower: true }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          categoryId: '1b2198a5-01bf-418a-af19-c253be608c6f', 
          name: 'Pants',
          slug: slugify('Pants', { lower: true }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          categoryId: '38ae44e6-469d-4414-83cc-b013a0e760d9', 
          name: 'Refrigerators',
          slug: slugify('Refrigerators', { lower: true }),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    } catch (error) {
      console.error('Error during subcategory seeding:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subcategories', null, {});
  }
};
