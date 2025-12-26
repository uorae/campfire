const pg = require('pg');
require('dotenv').config();
const express = require('express');

// db connection pool setup
const { Pool } = pg;
const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const app = express();

// middle ware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Campfire Backend Server!');
});

const PORT = 3000;

// listen for requests on port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*****************************************************
 *                   PANTRY ROUTES                   *
 *****************************************************/
app.get('/pantry', (req, res) => {
    pool.query('SELECT * FROM pantry_items', (err, res) => {
        if (err) {console.error(err)};
    })
    res.json(res.rows);
});

app.post('/pantry', (req, res) => {
    const item_name = req.body.item_name;
    const quantity = req.body.quantity;

    // if item in table, select quantity, add to req.body.quantity and pass to table - maybe put in put
    pool.query(`INSERT INTO pantry_items (item_name, quantity) VALUES ('${item_name}', '${quantity}')`, (err, res) => {
        if (err) {console.error(err)};
    })
    res.json();
});

app.delete('/pantry/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`DELETE FROM pantry_items WHERE item_id=${id}`, (err, res) => {
        if (err) {console.error(err)};
    })
    res.json();
});

app.delete('/clear/pantry', (req, res) => {
    pool.query(`DELETE FROM pantry_items`, (err, res) => {
        if (err) {console.error(err)};
    })
    res.json();
});


// app.put('/pantry/:id', (req, res) => {
//     // Logic to update pantry ingredient quantity by id
//     res.send(`Update pantry ingredient with id ${req.params.id}`);
// });

/*****************************************************
 *                   RECIPE ROUTES                   *
 *****************************************************/
app.get('/recipes', (req, res) => {
    // Logic to get recipes by ingredients
    res.send('Get recipes by ingredients');
});



/**
 * routes:
 * 
 * auth
 * 
 * pantry
 * get pantry ingredients
 * post pantry ingredients
 * delete pantry ingredients
 * put pantry ingredients (quantity)
 * clear pantry
 * 
 * recipes
 * get recipes by ingredients
 */