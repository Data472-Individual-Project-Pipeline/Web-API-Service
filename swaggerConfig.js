const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Express API with Swagger',
      version: '1.0.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://api.hua.nz/data472/cct/v1',
      },
    ],
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
