const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    let response = await punkAPI.getBeers();

    res.render('beers', {allBeers : response});
  } catch (error) {
    console.log(error);
  }

  //punkAPI.getBeers().then(resp => {res.render('beers', { allBeers : resp }); }).catch(e => console.log(e));
});

app.get('/beers/:id', async (req, res) => {
  try {
    let response = await punkAPI.getBeer(req.params.id);

    res.render('beers', {allBeers : response});
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beer', async (req, res) => {
  try{
    let response = await punkAPI.getRandom();
    res.render('random-beer', {beer : response[0]});
  } catch(e) {
    console.log(e);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
