const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const winston = require('winston');
const path = require('path');
const routes = require('./routes/cct_routes');
const fs = require('fs');

dotenv.config({ path: '.env.production.local' });

const app = express();

// 创建日志目录
const logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// 创建 logger
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

// 数据库配置
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// 数据库连接检查
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

app.use(bodyParser.json());

// 使用单独的路由文件来管理路由
app.use('/api/v1', routes(pool, logger));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
