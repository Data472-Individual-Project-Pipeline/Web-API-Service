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
   *   - name: Prasanna Venkatesh Venkataramanan
   *     description: API endpoints for Prasanna Venkatesh Venkataramanan
   */

  /**
   * @swagger
   * /pvv13:
   *   get:
   *     summary: Retrieve data from Prasanna Venkatesh Venkataramanan
   *     tags: [Prasanna Venkatesh Venkataramanan]
   *     responses:
   *       200:
   *         description: A list of national benefits
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: The unique ID of the benefit
   *                   benefittype:
   *                     type: string
   *                     description: The type of the benefit
   *                   date:
   *                     type: string
   *                     format: date
   *                     description: The date of the observation
   *                   observations:
   *                     type: integer
   *                     description: The number of observations
   *                   subtype:
   *                     type: string
   *                     description: The subtype of the benefit
   *                   type:
   *                     type: string
   *                     description: The type of observation
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
  router.get('/pvv13', async (req, res) => {
    try {
      const result = await pool.query('SELECT * from pvv13_national_benefits');
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for pvv13:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
