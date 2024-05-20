const express = require('express');

module.exports = (pool, logger) => {
  const router = express.Router();

  router.get('/owner', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM owners');
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for endpoint1:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

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
      logger.error('Error fetching data for endpoint2:', err.message);
      res.status(500).json({ error: err.message });
    }
  });


  return router;
};