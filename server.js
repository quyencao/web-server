const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs'); 
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Page'
    });
});

app.get('/about', (req, res) => {
  res.render('about', {
      pageTitle: 'About Page'
  }); 
});

app.get('/project', (req, res) => {
   res.render('project', {
       pageTitle: 'Project Page'
   }); 
});

app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to handle request.' 
   }); 
});

app.listen(port , () => {
    console.log(`Server is up on port ${port}.`);
});