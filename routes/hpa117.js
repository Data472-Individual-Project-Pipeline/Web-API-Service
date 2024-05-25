/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();

    /**
     * @swagger
     * /hpa117:
     *   get:
     *     summary: Retrieve data from Haritha Parthiban
     *     tags: [Haritha Parthiban]
     *     responses:
     *       200:
     *         description: Rainfall Data
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     */
    router.get('/hpa117', async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM hpa117_rainfall;`);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching data for hpa117:', err.message);
            res.status(500).json({ error: err.message });
        }
    });
    return router;
}