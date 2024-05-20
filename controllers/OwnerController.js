const Owner = require('../models/owners');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

exports.getAllOwners = async (req, res) => {
  try {
    const owners = await sequelize.query('SELECT * FROM owners', {
      type: QueryTypes.SELECT,
    });
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};