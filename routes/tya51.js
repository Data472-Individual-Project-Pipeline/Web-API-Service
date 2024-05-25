/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();
    /**
   * @swagger
   * /tya51:
   *   get:
   *     summary: Retrieve data from Tao Yan
   *     tags: [Tao Yan]
   *     responses:
   *       200:
   *         description: River flow observation data in Canterbury
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

    return router;
}