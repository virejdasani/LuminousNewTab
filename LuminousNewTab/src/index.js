// Initial function call to show date and time
showGreeting()

// Function to get the date and time
function getDateTime() {
    let today = new Date()
    let dayNum = today.getUTCDay()
    let date = today.getDate()
    let day
    let monthNum = today.getMonth() + 1
    let month

    function getTime() {

        let hours = today.getHours()
        let minutes = today.getMinutes()
        let postTime
        let time

        // Get time in 12hrs
        if (hours >= 12) {
            hours -= 12
            postTime = "pm"
        } else {
            postTime = "am"
        }

        // This is to fix a bug because 12pm shows 0
        if (hours == '0') {
            hours = '12'
        }

        // Get minutes in double digits at all times
        if (minutes < 10) {
            minutes = "0" + minutes
        }

        // Set the time to how it should be displayed in html
        time = hours + ":" + '</div>' + '<div id="dateTime">' + minutes + " " + postTime + '</div>'

        return time
    }

    // Get the time (to be displayed) and store it in a variable called time
    // Initial getTime function call
    time = getTime()

    // Assign day names to dayMap
    let dayMap = {
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
        7: 'Sun'
    }

    day = dayMap[dayNum]

    // Assign month names to monthNum
    let monthMap = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }

    month = monthMap[monthNum]

    // It's 7:38 on Thr, 31 Dec
    let greeting = "It's " + '<div id="dateTime">' + time + " on " + '<div id="dateTime">' + day + ", " + date + " " + month + '</div>'
    return greeting
}

// Function to display them on screen (recursively)
function showGreeting() {
    // Set the greeting to the greeting div
    document.getElementById("greeting").innerHTML = getDateTime()

    // Recursion to get current date without refreshing the page (Gets the time every two seconds)
    setTimeout(showGreeting, 2000)
}

// For google search operation
let searchButton = document.getElementById("searchButton")
let searchBox = document.getElementById("searchBox")

// When search button is clicked
searchButton.addEventListener("click", function (event) {
    // Don't reload the page
    // Without this, window.location.replace is not working
    event.preventDefault()

    // Google search
    window.location.replace("https://www.google.com/search?q=" + searchBox.value)
})

// To open google.com
let openGoogleButton = document.getElementById("openGoogle")
openGoogleButton.addEventListener('click', function (event) {
    // Don't reload the page
    // Without this, window.location.replace is not working
    event.preventDefault()

    window.location.replace("https://www.google.com/")
})
document.querySelectorAll(".toggleModal").forEach(x => {
    x.addEventListener('click', () => document.querySelector('#modal').classList.toggle('modalShown'))
})

// For weather info
// First get user IP
window.onload = function () {
    // Get Location from IP
    fetch('http://ip-api.com/json/')
        .then(function (response) {
            // console.log(response.json)
            return response.json()
        })
        .then(function (data) {
            let status = data.status
            let country = data.country
            let city = data.city
            let ip = data.query

            // If the ip, location etc is returned:
            if (status === "success") {
                // Fetch the weather api
                fetch('http://api.weatherapi.com/v1/current.json?key=' + weatherAPI_KEY + '&q=' + city + '&aqi=no')
                    .then(function (weatherResponse) {
                        return weatherResponse.json()
                    })
                    .then(function (weatherData) {
                        let state = weatherData.location.region
                        let lastUpdated = weatherData.current.last_updated
                        // List of all states that use fahrenheit.
                        let countriesThatUseF = ['United States', 'Bahamas', 'Cayman Islands', 'Liberia', 'Palau', 'Micronesia', 'Marshall Islands']
                        // console.log(state, lastUpdated, tempC, tempF)
                        let tempLetter = 'C'
                        let temp = weatherData.current.temp_c
                        // Checks to see if the country is in the list of countries that uses fahrenheit
                        if (countriesThatUseF.includes(country)) {
                            tempLetter = 'F'
                            temp = weatherData.current.temp_f
                        }

                        document.getElementById("weatherInfo").innerHTML = `
                        <button id="temp">
                            ${temp} °${tempLetter}
                        </button>
                        
                    `

                    })
            }

        })
}