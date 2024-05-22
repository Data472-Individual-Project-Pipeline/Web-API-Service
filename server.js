/**
 * Author: Aemon Wang
 * Email: aemooooon@gmail.com
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const winston = require('winston');
const path = require('path');
const routes = require('./routes/cct_routes');
const fs = require('fs');
const { swaggerUi, specs } = require('./config/swaggerConfig');

dotenv.config({ path: '.env.production.local' });

const app = express();

const logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`),
        }),
    ],
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function checkDatabaseConnection() {
    try {
        const client = await pool.connect();
        logger.info('Connected to PostgreSQL database');
        client.release();
    } catch (err) {
        logger.error('Failed to connect to PostgreSQL database:', err);
        process.exit(1); // Exit the process with a non-zero status code
    }
}

checkDatabaseConnection();

app.use(cors());
app.use(bodyParser.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/data472/cct/v1', routes(pool, logger));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
