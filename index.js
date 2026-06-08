const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Setup a quick test route
app.get('/', async (req, res) => {
  try {
    // This quickly tests if your Supabase DATABASE_URL is actually working!
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    const dbTest = await client.query('SELECT NOW();');
    await client.end();
    
    res.send(`<h1>Pepe's Backend is LIVE!</h1><p>Database Connected successfully at: ${dbTest.rows[0].now}</p>`);
  } catch (err) {
    res.send(`<h1>Pepe's Backend is LIVE!</h1><p>But Database connection failed: ${err.message}</p>`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
