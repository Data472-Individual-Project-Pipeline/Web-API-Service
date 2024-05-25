/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();

    /**
     * @swagger
     * /are154:
     *   get:
     *     summary: Retrieve data from Anirudh Revathi
     *     tags: [Anirudh Revathi]
     *     responses:
     *       200:
     *         description: New Zealand Superannuation and Veteran's Pension data
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   observation:
     *                     type: string
     *                     description: The 'Observation' column records the count of individuals corresponding to each specific 'subtype' within its broader 'type' category, providing detailed frequency data for the classifications.
     *                   recipientcharacteristic:
     *                     type: string
     *                     description: Categorizes individuals based on the type of pension which are New Zealand Superannuation and Veteran's Pension.
     *                   subtype:
     *                     type: string
     *                     description: Categorizes Individuals based on specific characteristics corresponding to the ‘type’ column.
     *                   type:
     *                     type: string
     *                     description: Categorizes individuals based on characteristics such as Receipt of additional support, gender, age category, and ethnicity.
     *                   date:
     *                     type: string
     *                     format: date
     *                     description: The date column represents the end-of-quarter dates corresponding to the quarterly data in the dataset.
     *       500:
     *         description: Server error
     */
    router.get('/are154', async (req, res) => {

        let query = `SELECT  recipientcharacteristic, subtype, type, observation, date from are154_data where owner='are154' order by date`;

        try {
            const result = await pool.query(query);
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching park assets:', err.message);
            res.status(500).json({ error: err.message });
        }
    });
    return router;
}