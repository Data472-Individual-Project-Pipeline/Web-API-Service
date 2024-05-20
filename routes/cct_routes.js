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

  // 添加其他查询端点
  router.get('/tya51', async (req, res) => {
    try {
      const result = await pool.query('select l.name, o.timestamp, o.value, l.nztmx, l.nztmy, o.qualitycode, o.owner from tya51_observation as o join tya51_location as l on l.locationid=l.locationid group by l.name, o.timestamp, o.value, l.nztmx, l.nztmy, o.qualitycode, o.owner order by timestamp asc ');
      res.json(result.rows);
    } catch (err) {
      logger.error('Error fetching data for endpoint2:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // 可以继续添加更多的端点
  // ...

  return router;
};