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
     *   - name: River flow
     *     description: API endpoints for River flow
     */

    /**
     * @swagger
     * /riverflow:
     *   get:
     *     summary: Retrieve data from River flow Datasets
     *     tags: [River flow]
     *     parameters:
     *       - in: query
     *         name: date
     *         schema:
     *           type: string
     *           format: date
     *           example: "2024-04-20"
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
     *       - in: query
     *         name: owner
     *         schema:
     *           type: string
     *           enum: [tya51, "hra80", "pwa115"]
     *           default: tya51
     *         description: owner name
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
    router.get('/riverflow', async (req, res) => {
        const { date, limit = 100, offset = 0, owner = 'tya51' } = req.query;
        const queryDate = date || `(SELECT MAX(o2.timestamp::date) FROM riverflow_observation AS o2)`;

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
                            riverflow_observation AS o 
                          JOIN 
                          riverflow_location AS l 
                          ON 
                            o.locationid = l.locationid 
                          WHERE 
                            o.timestamp::date = $1
                            AND
                            o.owner = $4
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
          `, [queryDate, limit, offset, owner]);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching data for tya51:', err.message);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}
