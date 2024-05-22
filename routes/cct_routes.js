/**
 * @swagger
 * tags:
 *   name: CCT
 *   description: CCT management
 */

const express = require('express');

module.exports = (pool, logger) => {
  const router = express.Router();

  /**
   * @swagger
   * /owner:
   *   get:
   *     summary: Retrieve a list of owners
   *     tags: [CCT]
   *     responses:
   *       200:
   *         description: A list of owners
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  router.get('/owner', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM owners');
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for endpoint1:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /hwa205:
   *   get:
   *     summary: Retrieve data from hua_aqi_stations
   *     tags: [CCT]
   *     responses:
   *       200:
   *         description: A list of data from hua_aqi_stations
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  router.get('/hwa205', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM hua_aqi_stations;`);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for hwa205:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /tya51:
   *   get:
   *     summary: Retrieve latest observation data for tya51
   *     tags: [CCT]
   *     responses:
   *       200:
   *         description: A list of latest observation data for tya51
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  router.get('/tya51', async (req, res) => {
    try {
      const result = await pool.query(`
                      SELECT 
                        l.name, 
                        o.timestamp, 
                        o.value, 
                        l.nztmx, 
                        l.nztmy, 
                        o.qualitycode, 
                        o.owner 
                      FROM 
                        tya51_observation AS o 
                      JOIN 
                        tya51_location AS l 
                      ON 
                        o.locationid = l.locationid 
                      WHERE 
                        o.timestamp::date = (
                            SELECT MAX(o2.timestamp::date) 
                            FROM tya51_observation AS o2
                        )
                      GROUP BY 
                        l.name, 
                        o.timestamp, 
                        o.value, 
                        l.nztmx, 
                        l.nztmy, 
                        o.qualitycode, 
                        o.owner 
                      ORDER BY 
                        o.timestamp ASC;
      `);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for tya51:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /dus15:
   *   get:
   *     summary: Retrieve data from dus15_seat
   *     tags: [CCT]
   *     responses:
   *       200:
   *         description: A list of data from dus15_seat
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  router.get('/dus15', async (req, res) => {
    try{
      const result = await pool.query(`SELECT * FROM dus15_seat;`);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for dus15:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /haritha_rainfall:
   *   get:
   *     summary: Retrieve data from haritha_rainfall
   *     tags: [CCT]
   *     responses:
   *       200:
   *         description: A list of data from haritha_rainfall
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  router.get('/haritha_rainfall', async (req, res) => {
    try{
      const result = await pool.query(`SELECT * FROM haritha_rainfall;`);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for haritha:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /rna104_cycleway:
   *   get:
   *     summary: Retrieve data from rna104_cycleway
   *     tags: [CCT]
   *     responses:
   *       200:
   *         description: A list of data from rna104_cycleway
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  router.get('/rna104_cycleway', async (req, res) => {
    try{
      const result = await pool.query(`SELECT * FROM rna104_cycleway;`);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for rna104:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /ruben_employment_indicators:
   *   get:
   *     summary: Retrieve data from ruben_employment_indicators
   *     tags: [CCT]
   *     responses:
   *       200:
   *         description: A list of data from ruben_employment_indicators
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  router.get('/ruben_employment_indicators', async (req, res) => {
    try{
      const result = await pool.query(`SELECT * FROM ruben_employment_indicators;`);
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for ruben:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
