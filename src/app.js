const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hadlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jane Hopper'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jane Hopper'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: "Here is the manual guide for help!!",
        name: "Jane Hopper"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address term."
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        error: "Help article not found",
        name: "Jane Hopper"
    });
});

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        error: "Page not found",
        name: "Jane Hopper"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});


// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Shrinath",
//         age: 22
//     }, {
//         name: "Kevin",
//         age: 20
//     }]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> About </h1>');
// })