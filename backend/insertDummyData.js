const { Pool } = require('pg');
require('dotenv').config();
const dummyData = require('./dummyData'); // Import dummy data file

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const insertDummyData = async () => {
  try {
    const client = await pool.connect();
    // Insert logic here using dummyData array
    client.release();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    pool.end();
  }
};

insertDummyData();
