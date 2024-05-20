const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      // require: true,
      rejectUnauthorized: false, // This line is important for some cloud providers
    },
  },
});

module.exports = sequelize;
