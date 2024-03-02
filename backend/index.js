const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors())
app.use(express.json());
// Define GET endpoint to fetch customer data
app.get('/api/customers', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM public.customer_data');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define POST endpoint to create a new customer
app.post('/api/customers', async (req, res) => {
    try {
        const { customer_name, age, phone, location } = req.body;
        // You can add validation for the request body here

        // Perform database insertion or any necessary operations to create the new customer
        // Example:
        // const result = await pool.query('INSERT INTO customers (customer_name, age, phone, location) VALUES ($1, $2, $3, $4)', [customer_name, age, phone, location]);

        res.status(201).json({
            status: 'success',
            data: {
                customer_name,
                age,
                phone,
                location
            }
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});