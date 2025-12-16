const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Campfire Backend Server!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*****************************************************
 *                   PANTRY ROUTES                   *
 *****************************************************/
app.get('/pantry', (req, res) => {
    // Logic to get pantry ingredients
    res.send('Get pantry ingredients');
});

app.post('/pantry', (req, res) => {
    // Logic to add pantry ingredients
    res.send('Post pantry ingredients');
});

app.delete('/pantry/:id', (req, res) => {
    // Logic to delete pantry ingredient by id
    res.send(`Delete pantry ingredient with id ${req.params.id}`);
});

app.put('/pantry/:id', (req, res) => {
    // Logic to update pantry ingredient quantity by id
    res.send(`Update pantry ingredient with id ${req.params.id}`);
});

/*****************************************************
 *                   RECIPE ROUTES                   *
 *****************************************************/


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
 * 
 * recipes
 * get recipes by ingredients
 */