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
     *   - name: Tao Yan
     *     description: API endpoints for Tao Yan
     */

    /**
     * @swagger
     * /tya51:
     *   get:
     *     summary: Retrieve data from Tao Yan
     *     tags: [Tao Yan]
     *     parameters:
     *       - in: query
     *         name: date
     *         schema:
     *           type: string
     *           format: date
     *           example: "2024-05-26"
     *         description: Optional date to filter the observations in the format YYYY-MM-DD
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 100
     *         description: Limit the number of results
     *       - in: query
     *         name: offset
     *         schema:
     *           type: integer
     *           default: 0
     *         description: Offset the results for pagination
     *     responses:
     *       200:
     *         description: River flow data in Canterbury
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                     description: Name of the location
     *                   timestamp:
     *                     type: string
     *                     format: date-time
     *                     description: Timestamp of the observation
     *                   value:
     *                     type: number
     *                     description: Observed value
     *                   nztmx:
     *                     type: number
     *                     description: NZTM X coordinate of the location
     *                   nztmy:
     *                     type: number
     *                     description: NZTM Y coordinate of the location
     *                   qualitycode:
     *                     type: string
     *                     description: Quality code of the observation
     *                   owner:
     *                     type: string
     *                     description: Owner of the observation data
     */
    router.get('/tya51', async (req, res) => {
        const { date, limit = 100, offset = 0 } = req.query;
        const queryDate = date || `(SELECT MAX(o2.timestamp::date) FROM tya51_observation AS o2)`;

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
                            o.timestamp::date = $1
                          GROUP BY 
                            l.name, 
                            o.timestamp, 
                            o.value, 
                            l.nztmx, 
                            l.nztmy, 
                            o.qualitycode, 
                            o.owner 
                          ORDER BY 
                            o.timestamp ASC
                          LIMIT $2 OFFSET $3
          `, [queryDate, limit, offset]);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching data for tya51:', err.message);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}
