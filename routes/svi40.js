/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
  const router = express.Router();

  // Swagger tags definition
  /**
   * @swagger
   * tags:
   *   - name: Sarmilan Vignaraja
   *     description: API endpoints for Sarmilan Vignaraja
   */

  // Endpoint for Sarmilan Vignaraja: prisoner_age_group
  /**
   * @swagger
   * /svi40/prisoner_age_group:
   *   get:
   *     summary: Retrieve data from Sarmilan Vignaraja
   *     tags: [Sarmilan Vignaraja]
   *     responses:
   *       200:
   *         description: A list of records from the prisoner_age_group table
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: The unique ID
   *                   age_group:
   *                     type: string
   *                     description: The age group of the prisoner
   *                   date:
   *                     type: string
   *                     format: date
   *                     description: The date of the observation
   *                   observations:
   *                     type: number
   *                     description: The number of observations
   *                   inserted_at:
   *                     type: string
   *                     format: date-time
   *                     description: The timestamp when the data was inserted
   *                   owner:
   *                     type: string
   *                     description: The owner of the data
   *       500:
   *         description: Error fetching data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Error message
   */
  router.get('/svi40/prisoner_age_group', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM prisoner_age_group WHERE owner = $1', ['svi40']);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for prisoner_age_group:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // Endpoint for Sarmilan Vignaraja: prisoner_ethnicity
  /**
   * @swagger
   * /svi40/prisoner_ethnicity:
   *   get:
   *     summary: Retrieve data from Sarmilan Vignaraja
   *     tags: [Sarmilan Vignaraja]
   *     responses:
   *       200:
   *         description: A list of records from the prisoner_ethnicity table
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: The unique ID
   *                   date:
   *                     type: string
   *                     format: date
   *                     description: The date of the observation
   *                   ethnicity:
   *                     type: string
   *                     description: The ethnicity of the prisoner
   *                   observations:
   *                     type: number
   *                     description: The number of observations
   *                   inserted_at:
   *                     type: string
   *                     format: date-time
   *                     description: The timestamp when the data was inserted
   *                   owner:
   *                     type: string
   *                     description: The owner of the data
   *       500:
   *         description: Error fetching data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Error message
   */
  router.get('/svi40/prisoner_ethnicity', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM prisoner_ethnicity WHERE owner = $1', ['svi40']);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for prisoner_ethnicity:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

// Endpoint for Sarmilan Vignaraja: prisoner_offence_type
  /**
   * @swagger
   * /svi40/prisoner_offence_type:
   *   get:
   *     summary: Retrieve data from Sarmilan Vignaraja
   *     tags: [Sarmilan Vignaraja]
   *     responses:
   *       200:
   *         description: A list of records from the prisoner_offence_type table
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: The unique ID
   *                   date:
   *                     type: string
   *                     format: date
   *                     description: The date of the observation
   *                   offence_type:
   *                     type: string
   *                     description: The type of offence
   *                   observations:
   *                     type: number
   *                     description: The number of observations
   *                   inserted_at:
   *                     type: string
   *                     format: date-time
   *                     description: The timestamp when the data was inserted
   *                   owner:
   *                     type: string
   *                     description: The owner of the data
   *       500:
   *         description: Error fetching data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Error message
   */
  router.get('/svi40/prisoner_offence_type', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM prisoner_offence_type WHERE owner = $1', ['svi40']);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for prisoner_offence_type:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // Endpoint for Sarmilan Vignaraja: prisoner_population
  /**
   * @swagger
   * /svi40/prisoner_population:
   *   get:
   *     summary: Retrieve data from Sarmilan Vignaraja
   *     tags: [Sarmilan Vignaraja]
   *     responses:
   *       200:
   *         description: A list of records from the prisoner_population table
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: The unique ID
   *                   date:
   *                     type: string
   *                     format: date
   *                     description: The date of the observation
   *                   gender:
   *                     type: string
   *                     description: The gender of the prisoner
   *                   location:
   *                     type: string
   *                     description: The location of the prisoner
   *                   observations:
   *                     type: number
   *                     description: The number of observations
   *                   population_type:
   *                     type: string
   *                     description: The type of population
   *                   inserted_at:
   *                     type: string
   *                     format: date-time
   *                     description: The timestamp when the data was inserted
   *                   owner:
   *                     type: string
   *                     description: The owner of the data
   *       500:
   *         description: Error fetching data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Error message
   */
  router.get('/svi40/prisoner_population', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM prisoner_population WHERE owner = $1', ['svi40']);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for prisoner_population:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // Endpoint for Sarmilan Vignaraja: prisoner_security_class
  /**
   * @swagger
   * /svi40/prisoner_security_class:
   *   get:
   *     summary: Retrieve data from Sarmilan Vignaraja
   *     tags: [Sarmilan Vignaraja]
   *     responses:
   *       200:
   *         description: A list of records from the prisoner_security_class table
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: The unique ID
   *                   date:
   *                     type: string
   *                     format: date
   *                     description: The date of the observation
   *                   security_class:
   *                     type: string
   *                     description: The security class of the prisoner
   *                   observations:
   *                     type: number
   *                     description: The number of observations
   *                   inserted_at:
   *                     type: string
   *                     format: date-time
   *                     description: The timestamp when the data was inserted
   *                   owner:
   *                     type: string
   *                     description: The owner of the data
   *       500:
   *         description: Error fetching data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Error message
   */
  router.get('/svi40/prisoner_security_class', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM prisoner_security_class WHERE owner = $1', ['svi40']);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for prisoner_security_class:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
