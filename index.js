require('dotenv').config({ path: '.env.production.local' });

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Ensure your Sequelize config file is set up to use the env variables
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

const ownerRoutes = require('./routes/owners');
app.use('/api/v1/owners', ownerRoutes);

// Error handling middleware should be after all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
