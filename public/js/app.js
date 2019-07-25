// console.log("Client side JS file is loaded.");

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const paraOne = document.querySelector('#m1');
const paraTwo = document.querySelector('#m2');

// paraOne.textContent = 'from JavaScript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    paraOne.textContent = 'Loading Message';
    paraTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // return console.log("Error:", data.error);
                paraOne.textContent = "Error: " + data.error;
            } else {
                paraOne.textContent = "Location: " + data.location;
                paraTwo.textContent = "Forecast: " + data.forecast;
                // console.log("Location:", data.location);
                // console.log("Forecast:", data.forecast);
            }
        });
    });
    // console.log(location);
});