/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();

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
    return router;
}