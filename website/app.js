// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=c661dd2afbc8be8cdf37250b5d339fa3&units=imperial';
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';

//Set up alert to make sure data is entered
const zipAlert = document.getElementById('zipAlert')
zipAlert.style.display = 'none';
let zipCode = document.getElementById('zip');

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', submitData)
/* Function called by event listener */
//??Why does it need event parameter
function submitData(event) {
    if (zipCode.value !== '') {
        zipAlert.style.display = 'none';
        fetchData(baseURL, zipCode.value, apiKey)
            .then(function (data) {
                //Get Date of entry
                const d = new Date();
                const dt = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate();
                //Get Feelings of entry
                const feelings = document.getElementById('feelings').value;

                postData('/post', { temp: data, date: dt, userInput: feelings })
                updateUI();
            });

    } else {
        zipAlert.style.display = 'block';
    }

}

/* Fetch data via API*/
const fetchData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch('https://' + baseURL + zipCode + apiKey)

    try {
        let newData = await res.json();

        return newData.main.temp;
    } catch (error) {
        console.log('Error: ', error);
    }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    try {
        let newData = await response.json();

        console.log(newData);
        return newData;
    } catch (error) {
        console.log('Error: ', error);

    }
}

/* Function to GET Project Data */
const getData = async (url) => {
    const request = await fetch(url)
    try {
        let data = await request.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error: ', error);
    }
}

getData('/get');

//Update UI to show entered data
const updateUI = async () => {
    const request = await fetch('/get')

    try {
        const allData = await request.json()

        //Update User Interface
        document.getElementById('date').textContent = allData[0].date;
        document.getElementById('temp').textContent = allData[0].temp;
        document.getElementById('content').textContent = allData[0].userInput;

        //Clear input field after submit
        zipCode.value = '';
    } catch (error) {
        console.log('Error: ', error);
    }
}