# Web API Service

## Project Overview

The Web API Service is built using Node.js and Express to provide API endpoints for visualizing data collected by Data472 student individual project. The project includes multiple routes that correspond to different datasets and uses Swagger for API documentation.

## Directory Structure

```bash
Web-API-Service/
│
├── config/
│ └── swaggerConfig.js # Swagger configuration file
│
├── log/
│ └── 2024-05-21.log # Log files
│
├── routes/
│ ├── are154.js # API route files
│ ├── dus15.js
│ ├── hpa117.js
│ ├── hwa205.js
│ ├── index.js
│ ├── jjm148.js
│ ├── owner.js
│ ├── pvv13.js
│ ├── rna104.js
│ ├── ruben.js
│ ├── sss135.js
│ ├── svi40.js
│ ├── tya51.js
│
├── .gitignore # Git ignore file
├── README.md # Project documentation
├── package.json # Project dependencies configuration file
└── server.js # Main server file
```


## Installation and Setup

1. Clone the project repository:

    ```sh
    git clone git@github.com:Data472-Individual-Project-Pipeline/Web-API-Service.git
    cd Web-API-Service
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the server:

    ```sh
    node server.js
    ```

## Usage

1. Start the server using:

    ```sh
    node server.js
    ```

2. Access the API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Configuration

- The Swagger configuration is located in `config/swaggerConfig.js`.
- Log files are stored in the `log` directory.

## Routes

### Example of a route file: `routes/jjm148.js`

```javascript
const express = require('express');

module.exports = (pool, logger) => {
    const router = express.Router();

    /**
     * @swagger
     * /jjm148:
     *   get:
     *     summary: Retrieve data from JJM148
     *     tags: [JJM148]
     *     responses:
     *       200:
     *         description: Data from JJM148
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: The unique ID
     *                   value:
     *                     type: number
     *                     description: The value
     */
    router.get('/jjm148', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM jjm148');
            res.json(result.rows);
        } catch (err) {
            logger.error('Error fetching data for jjm148:', err.message);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}
```

## Contributing

We welcome contributions! Please read the following instructions to get started:

1. Fork the project.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Create a new Pull Request.

## Contact

If you have any questions, please feel free to contact the Central Collection Team or project maintainer at aemooooon@gmail.com.