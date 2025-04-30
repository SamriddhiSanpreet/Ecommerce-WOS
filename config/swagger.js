const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API Docs',
      version: '1.0.0',
      description: 'Swagger documentation for all roles',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, '../src/routes/*.js')], // ✅ Corrected path
};

const swaggerSpec = swaggerJSDoc(options);

// Optional debug log
console.log('Loaded Swagger Paths:', Object.keys(swaggerSpec.paths));

module.exports = swaggerSpec;
