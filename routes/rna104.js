/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();
    /**
   * @swagger
   * /rna104:
   *   get:
   *     summary: Retrieve cycleway data with optional type filter
   *     tags: [CCT]
   *     parameters:
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *         description: The type of cycleway to filter by (default is "Cycleway")
   *     responses:
   *       200:
   *         description: A list of cycleway data
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
   *                   lastedittdate:
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
        const { type = 'Cycleway' } = req.query; // Default type to 'Cycleway' if not provided

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
                        createdate;
                    `;

        const queryParams = [type];

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