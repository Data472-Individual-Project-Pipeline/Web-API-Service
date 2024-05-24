/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();
    /**
 * @swagger
 * /dus15:
 *   get:
 *     summary: Retrieve park assets with optional type filter
 *     tags: [CCT]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: The type of park asset to filter by (default is "Bench")
 *     responses:
 *       200:
 *         description: A list of park assets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   photographurl:
 *                     type: string
 *                   sitename:
 *                     type: string
 *                   type:
 *                     type: string
 *                   lat:
 *                     type: number
 *                     format: double
 *                   lon:
 *                     type: number
 *                     format: double
 *                   inserted_at:
 *                     type: string
 *                     format: date-time
 *                   owner:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
    router.get('/dus15', async (req, res) => {
        const { type = 'Bench' } = req.query; // Default type to 'Bench' if not provided

        let query = `
                      SELECT 
                          id,
                          photographurl,
                          sitename,
                          type,
                          lat,
                          lon,
                          inserted_at,
                          owner
                      FROM 
                          dus15_seat
                      WHERE 
                          type = $1
                      ORDER BY 
                          sitename;
                      `;

        const queryParams = [type];

        try {
            const result = await pool.query(query, queryParams);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching park assets:', err.message);
            res.status(500).json({ error: err.message });
        }
    });
    return router;
}