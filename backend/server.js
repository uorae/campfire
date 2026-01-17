const pg = require('pg');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

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
app.use(cors());
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
    console.log('get hit')
  pool.query('SELECT * FROM pantry_items').then(
    response => {
        console.log(response)
        res.json(response.rows);  
    }).catch((err) => {
        console.error(err)
    });
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

app.get('/pantry/:id', (req, res) => {
    console.log('get hit')
  pool.query('SELECT * FROM pantry_items WHERE item_id=${id}').then(
    response => {
        console.log(response)
        res.json(response.rows);  
    }).catch((err) => {
        console.error(err)
    });
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
    const query = 
        `CREATE OR REPLACE VIEW Ingredient_Intersection(recipe_id, recipe, ingredient_count) AS
            SELECT r.id,
                r.name,
                count(ri.ingredient)
            FROM pantry_items AS p
            INNER JOIN recipe_ingredients AS ri ON (p.ingredient = ri.ingredient)
            INNER JOIN recipes AS r ON (r.id = ri.recipe)
            GROUP BY r.id, r.name
        ;

        CREATE OR REPLACE VIEW Available_Recipes(recipe_id, recipe, ingredient_count) AS
            SELECT r.id,
                r.name,
                count(ri.ingredient)
            FROM recipes AS r
            INNER JOIN recipe_ingredients AS ri ON (r.id = ri.recipe)
            INNER JOIN Ingredient_Intersection AS i ON (r.id = i.recipe_id)
            GROUP BY r.id, r.name, i.ingredient_count
            HAVING count(ri.ingredient) = i.ingredient_count
        ;

        SELECT * FROM Available_Recipes;`

    pool.query(query).then(
    response => {
        console.log(response)
        res.json(response.rows);  
    }).catch((err) => {
        console.error(err)
    });
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
 * 
/**
 * -- Create Hotel table
CREATE TABLE ingredients (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE pantry_items (
    id INT PRIMARY KEY,
    ingredient INT references ingredients(id),
    name VARCHAR(100)
);

CREATE TABLE recipes (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE recipe_ingredients (
    recipe INT references recipes(id),
    ingredient INT references ingredients(id)
);

-- Insert sample data into Hotel table
INSERT INTO ingredients (id, name) VALUES
(1, 'egg'),
(2, 'flour'),
(3, 'milk'),
(4, 'bread'),
(5, 'cinnamon'),
(6, 'cream'),
(7, 'butter')
;

INSERT INTO pantry_items (id, ingredient, name) VALUES
(1, 1, 'egg'),
(2, 2, 'flour'),
(3, 3, 'milk'),
(4, 4, 'bread')
;

INSERT INTO recipes (id, name) VALUES
(1, 'tiramisu'),
(2, 'french toast'),
(3, 'available')
;

INSERT INTO recipe_ingredients (recipe, ingredient) VALUES
(1, 1),
(1, 6),
(2, 3),
(2, 4),
(2, 5),
(3, 1),
(3, 2),
(3, 3),
(3, 4)
;


-- create a view for name,license where the address is in sydney or melbourne
CREATE OR REPLACE VIEW Ingredient_Intersection(ingredient_id, item_name, recipe_id, recipe) AS
     SELECT ri.ingredient,
            p.name,
            r.id,
            r.name
     FROM pantry_items AS p
     INNER JOIN recipe_ingredients AS ri ON (p.ingredient = ri.ingredient)
     INNER JOIN recipes AS r ON (r.id = ri.recipe)
;

SELECT * FROM Ingredient_Intersection;

CREATE OR REPLACE VIEW recipe_ingredients_in_pantry(recipe_id, recipe, ingredient_count) AS
     SELECT recipe_id,
            recipe,
            count(ingredient_id)
     FROM Ingredient_Intersection AS i
     GROUP BY recipe_id, recipe
;

SELECT * FROM recipe_ingredients_in_pantry;

CREATE OR REPLACE VIEW total_recipe_ingredients(recipe_id, recipe, ingredient_count) AS
     SELECT r.id,
            r.name,
            count(ri.ingredient)
     FROM recipes AS r
     INNER JOIN recipe_ingredients AS ri ON (r.id = ri.recipe)
     GROUP BY r.id, r.name
;

SELECT * FROM total_recipe_ingredients;

CREATE OR REPLACE VIEW Available_Recipes(recipe_id, recipe, ingredients) AS
      SELECT r.recipe_id,
             r.recipe,
             p.ingredient_count
      FROM total_recipe_ingredients AS r
      INNER JOIN recipe_ingredients_in_pantry AS p ON (r.recipe_id = p.recipe_id AND r.ingredient_count = p.ingredient_count)
;

SELECT * FROM Available_Recipes;
 */