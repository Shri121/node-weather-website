const request = require('request');

const forecast = ((latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/759e1f324fe4ec10f18f90e5a4ef1563/" + latitude + "," + longitude + "?units=si&lang=es";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!!", undefined);
        } else if (body.error) {
            callback('Unable to find location!!', undefined);
        } else {
            console.log(body);
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability * 100 + "% chance of rain. The wind speed is " + body.currently.windSpeed * 100 + " and also the humidity is " + body.currently.humidity +".");
        }
    });
});

module.exports = forecast;