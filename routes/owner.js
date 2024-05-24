/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
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

  return router;
}