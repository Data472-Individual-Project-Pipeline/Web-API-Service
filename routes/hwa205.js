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
     *   - name: Hua Wang
     *     description: API endpoints for Hua Wang
     */

    /**
     * @swagger
     * /hwa205:
     *   get:
     *     summary: Retrieve data from Hua Wang
     *     tags: [Hua Wang]
     *     responses:
     *       200:
     *         description: Canterbury Air Quality Index Data
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     */
    router.get('/hwa205', async (req, res) => {
        try {
            const result = await pool.query(`SELECT stationcity, stationshortname, stationname, stationcode, stationlatitude as latitude, stationlongitude as longitude, monitorchannel, monitorname, monitortypecode, monitortypedescription, monitorfullname, stationlocation FROM hua_aqi_stations;`);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching data for hwa205:', err.message);
            res.status(500).json({ error: err.message });
        }
    });
    return router;
}