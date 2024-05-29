const express = require('express');
const ownerRoutes = require('./owner');
const hpa117Routes = require('./hpa117');
const hwa205Routes = require('./hwa205');
const riverflowRoutes = require('./riverflow');
const dus15Routes = require('./dus15');
const jjm148Routes = require('./jjm148');
const pvv13Routes = require('./pvv13');
const rna104Routes = require('./rna104');
const rubenRoutes = require('./ruben');
const are154Routes = require('./are154');
const svi40Routes = require('./svi40');
const sss135Routes = require('./sss135');

module.exports = (pool, logger) => {
  const router = express.Router();

  // Mount each route
  router.use(are154Routes(pool, logger));
  router.use(ownerRoutes(pool, logger));
  router.use(hpa117Routes(pool, logger));
  router.use(hwa205Routes(pool, logger));
  router.use(riverflowRoutes(pool, logger));
  router.use(dus15Routes(pool, logger));
  router.use(jjm148Routes(pool, logger));
  router.use(rna104Routes(pool, logger));
  router.use(rubenRoutes(pool, logger));
  router.use(pvv13Routes(pool, logger));
  router.use(svi40Routes(pool, logger));
  router.use(sss135Routes(pool, logger));

  return router;
};
