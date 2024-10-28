const dotenv = require('dotenv'),
    express = require('express'),
    cors = require('cors'),
    { Client } = require('pg'),
    path = require('path')

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

dotenv.config();

const client = new Client({
    connectionString: process.env.PGURI
})

client.connect()

app.get('/', async (_request, response) => {
    try {
        const { rows } = await client.query('SELECT * FROM characters');
        response.json(rows); 
    } catch (error) {
        console.error('Database query error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(express.static(path.join(path.resolve(), 'dist')))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Ready at http://localhost:${port}/`)
})