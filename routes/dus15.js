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
     *   - name: Dimitrii Ustinov
     *     description: API endpoints for Dimitrii Ustinov
     */

    /**
     * @swagger
     * /dus15:
     *   get:
     *     summary: Retrieve data from Dimitrii Ustinov
     *     tags: [Dimitrii Ustinov]
     *     parameters:
     *       - in: query
     *         name: type
     *         schema:
     *           type: string
     *           enum: ["Bench", "Seat", "Unknown"]
     *           default: Bench
     *         description: The type of park asset to filter by
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           example: 1
     *         description: The page number to retrieve (default is 1)
     *       - in: query
     *         name: pageSize
     *         schema:
     *           type: integer
     *           example: 100
     *         description: The number of items per page (default is 100)
     *     responses:
     *       200:
     *         description: Information about seats in Christchurch
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
        const { type = 'Bench', page = 1, pageSize = 100 } = req.query; // Default values

        const offset = (page - 1) * pageSize;

        let query = `
            SELECT photographurl, sitename,
                   type,
                   lat as latitude,
                   lon as longitude,
                   owner
            FROM dus15_seat
            WHERE type = $1
            ORDER BY sitename
            LIMIT $2 OFFSET $3;
        `;

        const queryParams = [type, pageSize, offset];

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
