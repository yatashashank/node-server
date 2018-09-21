const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 2000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//Invoking  express middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

//app.use((req, res, next) => {
//res.render('maintenance.hbs')
//})

//HBS helper functions
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//Requsting the pages
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        message: 'HandleBarJS'
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Cannot fetch Sorry',
    })
});
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});