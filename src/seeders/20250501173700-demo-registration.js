const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const hashedPassword1 = await bcrypt.hash('password123', 10);
      const hashedPassword2 = await bcrypt.hash('password456', 10);

      await queryInterface.bulkInsert('Registrations', [
        {
          id: uuidv4(),
          name: 'John Doe',
          email: 'john@example.com',
          password: hashedPassword1,
          phone: '1234567890',
          address: '123 Street, City, Country',
          roleId: 'e8b2f9f2-b791-4a23-95f7-0a74569abe4a', 
          slug: slugify('John Doe', { lower: true }),
          profileImage: 'profile1.jpg',
          isVerified: false,
          status: 'inactive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: hashedPassword2,
          phone: '0987654321',
          address: '456 Avenue, City, Country',
          roleId: '7c46d1f9-fa3a-47e6-a4a8-9ab68680d1b1', 
          slug: slugify('Jane Doe', { lower: true }),
          profileImage: 'profile2.jpg',
          isVerified: false,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Registrations', null, {});
  }
};
