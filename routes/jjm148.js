/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();
    /**
   * @swagger
   * /jjm148:
   *   get:
   *     summary: Retrieve AQI records with optional filters from jjm148
   *     tags: [CCT]
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
        const { recordeddate, recordedtime, stationname, monitortypename } = req.query;
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
                        s.stationlatitude,
                        s.stationlongitude,
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

        query += ` ORDER BY a.recordeddate, a.recordedtime, s.stationname`;

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