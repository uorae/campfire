const pg = require('pg');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
    `INSERT INTO ingredients (name) VALUES ($1)
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING id`,
    [ingredient_name]
  )
  .then(result => {
    // post into pantry with returned ingredient id
    const ingredient_id = result.rows[0].id;
    return pool.query(
      `INSERT INTO pantry_items (ingredient) VALUES ($1) RETURNING *`,
      [ingredient_id]
    );
  })
  .then(result => res.status(200).json(result.rows[0]))
  .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /pantry/:id
app.delete('/pantry/:id', (req, res) => {
  pool.query(
    `DELETE FROM pantry_items WHERE id = $1`,
    [req.params.id]
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

// GET /recipes
app.get('/recipes', (req, res) => {
  pool.query(
    `SELECT ingredients.name 
      FROM pantry_items 
      JOIN ingredients ON pantry_items.ingredient = ingredients.id`
  )
  .then(result => {
    const ingredientList = result.rows.map(row => row.name).join(',');

    return axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredientList,
        number: 12,
        ranking: 1,
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });
  })
  .then(response => {
    // id, title, image, usedIngredients, missedIngredients, likes
    response.data.sort((a, b) => a.missedIngredientCount - b.missedIngredientCount); // sort by missed ingredients asc
    res.json(response.data);
  })
  .catch(err => res.status(500).json({ error: err.message }));
});

// GET /recipes/:id
app.get('/recipes/:id', (req, res) => {
  axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information`, {
    params: { apiKey: process.env.SPOONACULAR_API_KEY }
  })
  .then(response => res.json(response.data))
  .catch(err => res.status(500).json({ error: err.message }));
});