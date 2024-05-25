const express = require('express');
const ownerRoutes = require('./owner');
const hpa117Routes = require('./hpa117');
const hwa205Routes = require('./hwa205');
const tya51Routes = require('./tya51');
const dus15Routes = require('./dus15');
const jjm148Routes = require('./jjm148');
const rna104Routes = require('./rna104');
const rubenRoutes = require('./ruben');
const are154Routes = require('./are154');

module.exports = (pool, logger) => {
  const router = express.Router();

  // Mount each route
  router.use(are154Routes(pool, logger));
  router.use(ownerRoutes(pool, logger));
  router.use(hpa117Routes(pool, logger));
  router.use(hwa205Routes(pool, logger));
  router.use(tya51Routes(pool, logger));
  router.use(dus15Routes(pool, logger));
  router.use(jjm148Routes(pool, logger));
  router.use(rna104Routes(pool, logger));
  router.use(rubenRoutes(pool, logger));

  return router;
};
