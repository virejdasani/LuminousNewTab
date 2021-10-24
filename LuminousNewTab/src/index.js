// Initial function call to show date and time
showGreeting();

// Function to get the date and time
function getDateTime() {
  let today = new Date();
  let dayNum = today.getUTCDay();
  let date = today.getDate();
  let day;
  let monthNum = today.getMonth();
  let month;

  function getTime() {
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let postTime;
    let time;

    // Get time in 12hrs
    if (hours >= 12) {
      hours -= 12;
      postTime = 'pm';
    } else {
      postTime = 'am';
    }

    // This is to fix a bug because 12pm shows 0
    if (hours == '0') {
      hours = '12';
    }

    // Get minutes in double digits at all times
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    // Set the time to how it should be displayed in html
    time =
      hours +
      ':' +
      '</div>' +
      '<div id="dateTime">' +
      minutes +
      ' ' +
      postTime +
      '</div>';

    return time;
  }

  // Get the time (to be displayed) and store it in a variable called time
  // Initial getTime function call
  time = getTime();

  // Assign day names to dayMap
  let dayMap = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    0: 'Sun',
  };

  day = dayMap[dayNum];

  // Assign month names to monthNum
  let monthMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };

  month = monthMap[monthNum];

  // It's 7:38 on Thr, 31 Dec
  let greeting =
    "It's " +
    '<div id="dateTime">' +
    time +
    ' on ' +
    '<div id="dateTime">' +
    day +
    ', ' +
    date +
    ' ' +
    month +
    '</div>';
  return greeting;
}

// Function to display them on screen (recursively)
function showGreeting() {
  // Set the greeting to the greeting div
  document.getElementById('greeting').innerHTML = getDateTime();

  // Recursion to get current date without refreshing the page (Gets the time every two seconds)
  setTimeout(showGreeting, 2000);
}

// opening and closing modal
document.querySelectorAll('.toggleModal').forEach(x => {
  x.addEventListener('click', () =>
    document.querySelector('#modal').classList.toggle('modalShown')
  );
});

// closing modal on esc button
document.addEventListener('keydown', function (event) {
  if (
    event.keyCode === 27 &&
    document.querySelector('#modal').classList.contains('modalShown')
  ) {
    document.querySelector('#modal').classList.toggle('modalShown');
  }
});

// For weather info
// First get user IP
window.onload = function () {
  // Get Location from IP
  fetch('http://ip-api.com/json/')
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
      if (status === 'success') {
        // Fetch the weather api
        fetch(
          'http://api.weatherapi.com/v1/current.json?key=' +
            weatherAPI_KEY +
            '&q=' +
            city +
            '&aqi=no'
        )
          .then(function (weatherResponse) {
            return weatherResponse.json();
          })
          .then(function (weatherData) {
            let state = weatherData.location.region;
            let lastUpdated = weatherData.current.last_updated;
            // List of all states that use fahrenheit.
            let countriesThatUseF = [
              'United States',
              'Bahamas',
              'Cayman Islands',
              'Liberia',
              'Palau',
              'Micronesia',
              'Marshall Islands',
            ];
            // console.log(state, lastUpdated, tempC, tempF)
            let tempLetter = 'C';
            let temp = weatherData.current.temp_c;
            // Checks to see if the country is in the list of countries that uses fahrenheit
            if (countriesThatUseF.includes(country)) {
              tempLetter = 'F';
              temp = weatherData.current.temp_f;
            }

            document.getElementById('weatherInfo').innerHTML = `
                        <button id="temp">
                            ${temp} °${tempLetter}
                        </button>
                        
                    `;
          });
      }
    });
};
