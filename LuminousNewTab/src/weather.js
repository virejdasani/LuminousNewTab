// For weather info
// First get user IP
window.onload = function () {
  // Get Location from IP
  fetch("http://ip-api.com/json/")
    .then(function (response) {
      // console.log(response.json)
      return response.json();
    })
    .then(function (data) {
      let status = data.status;
      let country = data.country;
      let city = data.city;
      let ip = data.query;

      // If the ip, location etc is returned:
      if (status === "success") {
        // Fetch the weather api
        fetch(
          "http://api.weatherapi.com/v1/current.json?key=" +
            weatherAPI_KEY +
            "&q=" +
            city +
            "&aqi=no"
        )
          .then(function (weatherResponse) {
            return weatherResponse.json();
          })
          .then(function (weatherData) {
            let state = weatherData.location.region;
            let lastUpdated = weatherData.current.last_updated;
            // List of all states that use fahrenheit.
            let countriesThatUseF = [
              "United States",
              "Bahamas",
              "Cayman Islands",
              "Liberia",
              "Palau",
              "Micronesia",
              "Marshall Islands",
            ];
            // console.log(state, lastUpdated, tempC, tempF)
            let tempLetter = "C";
            let temp = weatherData.current.temp_c;
            // Checks to see if the country is in the list of countries that uses fahrenheit
            if (countriesThatUseF.includes(country)) {
              tempLetter = "F";
              temp = weatherData.current.temp_f;
            }

            document.getElementById("weatherInfo").innerHTML = `
                <button id="temp">
                    ${temp} °${tempLetter}
                </button>
            `;
          });
      }
    });
};
