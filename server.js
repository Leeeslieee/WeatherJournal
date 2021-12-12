// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 8000;
const server = app.listen(port, listening)
// Callback to debug
function listening() {
    console.log(`Running on localhost: ${port}`);
}
// Initialize all route with a callback function
app.get('/get', getData)
app.post('/post', postData)

// Callback function to complete GET '/all'
function getData(req, res){
    res.send(projectData);
}

// Post Route
const projectData =[]

function postData(req,res){ 
    let newData = req.body;
    let newEntry={
        temp: newData.temp,
        date: newData.date,
        userInput: newData.userInput
    }
    projectData.push(newData);
    console.log(projectData);
    res.send(projectData);
}