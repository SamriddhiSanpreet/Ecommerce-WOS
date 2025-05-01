const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Products', [
        {
          id: uuidv4(),
          sellerId: '8343d60f-ee38-45c5-9df1-66acabd7eec7',  
          categoryId: '37b81039-f253-4a12-88a8-fa213083836a',  
          subcategoryId: 'c0c0cb8b-8eff-459e-a57a-ea8491ff3bb3',
          name: 'iPhone 13',
          slug: slugify('iPhone 13', { lower: true }),
          description: 'Latest Apple iPhone 13 with advanced features.',
          price: 999.99,
          stock: 50,
          image: 'iphone-13.jpg',
          brand: 'Apple',
          color: 'Midnight',
          size: '6.1 inches',
          material: 'Glass and Aluminum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          sellerId: 'd77b6876-a45e-4a36-92f6-38433075f596',  
          categoryId: '37b81039-f253-4a12-88a8-fa213083836a',  
          subcategoryId: 'c0c0cb8b-8eff-459e-a57a-ea8491ff3bb3',  
          name: 'Samsung Galaxy S21',
          slug: slugify('Samsung Galaxy S21', { lower: true }),
          description: 'Samsung Galaxy S21 with an advanced camera system.',
          price: 899.99,
          stock: 30,
          image: 'galaxy-s21.jpg',
          brand: 'Samsung',
          color: 'Phantom Gray',
          size: '6.2 inches',
          material: 'Glass and Metal',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          sellerId: '6f764583-95bc-4253-b82c-b3faa03400dc',  
          categoryId: 'edbd714f-e8f0-447f-a056-46b8309294b7',  
          subcategoryId: 'cca9b442-a457-41cd-a78f-61427ba45825',  
          name: 'Nike Air Max 2021',
          slug: slugify('Nike Air Max 2021', { lower: true }),
          description: 'Comfortable and stylish Nike Air Max 2021 sneakers.',
          price: 129.99,
          stock: 100,
          image: 'nike-air-max-2021.jpg',
          brand: 'Nike',
          color: 'Black',
          size: '10',
          material: 'Synthetic and Mesh',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    } catch (error) {
      console.error('Error during product seeding:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
