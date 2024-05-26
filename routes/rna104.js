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
     *   - name: Roman Naumov
     *     description: API endpoints for Roman Naumov
     */

    /**
     * @swagger
     * /rna104:
     *   get:
     *     summary: Retrieve data from Roman Naumov
     *     tags: [Roman Naumov]
     *     parameters:
     *       - in: query
     *         name: type
     *         schema:
     *           type: string
     *           enum: [Cycleway, "Shared zone", "Shared path", "Cycle lane", "Trail", "Quiet street"]
     *           default: Cycleway
     *         description: The type of cycleway to filter by
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
     *         description: A list of cycleway data in Christchurch
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   servicestatus:
     *                     type: string
     *                   majorcyclewayname:
     *                     type: string
     *                   type:
     *                     type: string
     *                   createdate:
     *                     type: string
     *                     format: date-time
     *                   lasteditdate:
     *                     type: string
     *                     format: date-time
     *                   shape_length:
     *                     type: number
     *                     format: double
     *                   geometrypath:
     *                     type: string
     *                   inserted_at:
     *                     type: string
     *                     format: date-time
     *                   owner:
     *                     type: string
     *       500:
     *         description: Internal server error
     */
    router.get('/rna104', async (req, res) => {
        const { type = 'Cycleway', page = 1, pageSize = 100 } = req.query; // Default values

        const offset = (page - 1) * pageSize;

        let query = `
                    SELECT 
                        id,
                        servicestatus,
                        majorcyclewayname,
                        type,
                        createdate,
                        lasteditdate,
                        shape_length,
                        geometrypath,
                        inserted_at,
                        owner
                    FROM 
                        rna104_cycleway
                    WHERE 
                        type = $1
                    ORDER BY 
                        createdate
                    LIMIT $2 OFFSET $3;
                    `;

        const queryParams = [type, pageSize, offset];

        try {
            const result = await pool.query(query, queryParams);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching cycleway data:', err.message);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}
