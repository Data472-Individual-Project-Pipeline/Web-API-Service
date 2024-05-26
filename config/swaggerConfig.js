/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Urban Data Centre API V1',
      version: '1.0.0',
      description: 'This is the Urban Data Centre Application providing Web APIs for Visualisation',
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
