const pg = require('pg');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { Pool } = pg;
const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

/*****************************************************
 *                   PANTRY ROUTES                   *
 *****************************************************/

// GET /pantry
app.get('/pantry', (req, res) => {
    // join pantry with ingredients to get ingredient name
    pool.query(
        `SELECT pantry_items.id, ingredients.name 
         FROM pantry_items 
         JOIN ingredients ON pantry_items.ingredient = ingredients.id`
    )
    .then(result => res.json(result.rows))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST /pantry
app.post('/pantry', (req, res) => {
    // normalise ingredient name
    const ingredient_name = (req.body.ingredient_name).toLowerCase().trim();

    pool.query(
        `INSERT INTO ingredients (name) VALUES ('${ingredient_name}')
         ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
         RETURNING id`
    )
    .then(result => {
        // post into pantry with returned ingredient id
        const ingredient_id = result.rows[0].id;
        return pool.query(
            `INSERT INTO pantry_items (ingredient) VALUES ('${ingredient_id}') RETURNING *`
        );
    })
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /pantry/:id
app.delete('/pantry/:id', (req, res) => {
    pool.query(
        `DELETE FROM pantry_items WHERE id = ${req.params.id}`,
    )
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /clear/pantry
// wipes all pantry items
app.delete('/clear/pantry', (req, res) => {
    pool.query(`DELETE FROM pantry_items`)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({ error: err.message }));
});

/*****************************************************
 *                   RECIPE ROUTES                   *
 *****************************************************/

// GET /recipes — coming soon
app.get('/recipes', (req, res) => {
    res.json({ message: 'coming soon' });
});