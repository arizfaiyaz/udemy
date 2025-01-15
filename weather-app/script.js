document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempratureDisplay = document.getElementById("temprature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "fa302855ec56e6763defea2ee28c0b79"; // env variable

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        // it may throw an error\
        // server is in other place taking the time

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    });


    async function  fetchWeatherData(city){
        // Gets the data
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

       const response = await fetch(url);
       console.log(typeof response);       
       console.log("RESPONSE", response);

       if (!response.ok){
        throw new Error("City not found");
       }
       const data = await response.json();
       return data
    }

    function displayWeatherData(data){
        // Display the data
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;

        // unlock the display
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError(){
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});