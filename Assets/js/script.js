const apiKey = '8c72c4343cd5c617c7afc4ad0c9e6a02';

    document.querySelector("#search-button").addEventListener("click", function() {
        //get user input
        var input = document.querySelector("#find-location").value;
        //based on the input we want current weather to show
        getWeather(input);
        //based on the input we want forecast to show

        //create buttons
        createCityButton(input);
    });

    function createCityButton(cityName) {
        let template = document.createElement('button');
        template.classList.add("city-button");
        template.textContent = cityName;

        document.querySelector(".button-container").append(template);
    }

    //event delegation
    document.querySelector(".button-container").addEventListener("click", function(event) {
        if (event.target.className.indexOf("city-button") > -1) {
            getWeather(event.target.textContent);
        }
    });

    function getWeather(cityName) {
        let queryurl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + apiKey;

        fetch(queryurl).then(function(res) {
            return res.json();
        }).then(function(data) {
            console.log("***data:",data);

            const template = `
            <div class="card-body">
                <h3 id="city-name" class="city-name align-middle">${data.name}</h3>
                <img id="current-pic" alt="weather icon" src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png">
                <p id="temperature">Temperature: ${data.main.temp} F</p>
                <p id="humidity">Humidity: ${data.main.humidity} %</p>
                <p id="wind-speed">Wind Speed: ${data.wind.speed} mph</p>
                <p id="UV-index"></p>
            </div>
            `;

            console.log("template:",template);

            document.querySelector("#current-weather").innerHTML = template;
        })
    }