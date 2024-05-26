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
     *   - name: Julian Maranan & Sridhar Vannada
     *     description: API endpoints for Julian Maranan & Sridhar Vannada
     */

    /**
     * @swagger
     * /jjm148:
     *   get:
     *     summary: Retrieve AQI Data from Julian Maranan & Sridhar Vannada
     *     tags: [Julian Maranan & Sridhar Vannada]
     *     parameters:
     *       - in: query
     *         name: recordeddate
     *         schema:
     *           type: string
     *           format: date
     *         description: The recorded date of the observation
     *       - in: query
     *         name: recordedtime
     *         schema:
     *           type: string
     *           format: time
     *         description: The recorded time of the observation
     *       - in: query
     *         name: stationname
     *         schema:
     *           type: string
     *         description: The name of the station
     *       - in: query
     *         name: monitortypename
     *         schema:
     *           type: string
     *         description: The name of the monitor type
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
     *         description: A list of AQI records
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   record_id:
     *                     type: integer
     *                   recordeddate:
     *                     type: string
     *                     format: date
     *                   recordedtime:
     *                     type: string
     *                     format: time
     *                   stationcode:
     *                     type: integer
     *                   stationname:
     *                     type: string
     *                   stationlongname:
     *                     type: string
     *                   city:
     *                     type: string
     *                   stationaddress:
     *                     type: string
     *                   stationlatitude:
     *                     type: number
     *                     format: double
     *                   stationlongitude:
     *                     type: number
     *                     format: double
     *                   monitortypecode:
     *                     type: integer
     *                   monitortypedescription:
     *                     type: string
     *                   monitortypename:
     *                     type: string
     *                   obsvalue:
     *                     type: number
     *                     format: double
     *                   measurementunit:
     *                     type: string
     *                   inserted_at:
     *                     type: string
     *                     format: date-time
     *                   owner:
     *                     type: string
     *       500:
     *         description: Internal server error
     */
    router.get('/jjm148', async (req, res) => {
        const { recordeddate, recordedtime, stationname, monitortypename, page = 1, pageSize = 100 } = req.query;
        const offset = (page - 1) * pageSize;

        let query = `
            SELECT 
                a.id AS record_id,
                a.recordeddate,
                a.recordedtime,
                s.stationcode,
                s.stationname,
                s.stationlongname,
                s.city,
                s.stationaddress,
                s.stationlatitude as latitude,
                s.stationlongitude as longitude,
                m.monitortypecode,
                m.monitortypedescription,
                m.monitortypename,
                a.obsvalue,
                m.monitortypeunits AS measurementunit,
                a.inserted_at,
                a.owner
            FROM 
                jjm148_aqi a
            JOIN 
                jjm148_cl_stations s ON a.stationcode = s.stationcode
            JOIN 
                jjm148_cl_monitortypes m ON a.monitortypecode = m.monitortypecode
            WHERE 
                1=1
        `;
        const queryParams = [];

        if (recordeddate) {
            queryParams.push(recordeddate);
            query += ` AND a.recordeddate = $${queryParams.length}`;
        }

        if (recordedtime) {
            queryParams.push(recordedtime);
            query += ` AND a.recordedtime = $${queryParams.length}`;
        }

        if (stationname) {
            queryParams.push(stationname);
            query += ` AND s.stationname = $${queryParams.length}`;
        }

        if (monitortypename) {
            queryParams.push(monitortypename);
            query += ` AND m.monitortypename = $${queryParams.length}`;
        }

        query += ` ORDER BY a.recordeddate, a.recordedtime, s.stationname LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;

        queryParams.push(pageSize, offset);

        try {
            const result = await pool.query(query, queryParams);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching AQI records:', err.message);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}
