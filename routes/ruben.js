/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();
    /**
   * @swagger
   * /ruben:
   *   get:
   *     summary: Retrieve data from ruben
   *     tags: [Ruben Castaing]
   *     responses:
   *       200:
   *         description: A list of data from ruben
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
    router.get('/ruben', async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM ruben_employment_indicators;`);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching data for ruben:', err.message);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}