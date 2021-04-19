// Initial function call for date and time
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

    // Assign day names to dayNum
    if (dayNum === 1) {
        day = "Mon"
    } else if (dayNum === 2) {
        day = "Tue"
    } else if (dayNum === 3) {
        day = "Wed"
    } else if (dayNum === 4) {
        day = "Thu"
    } else if (dayNum === 5) {
        day = "Fri"
    } else if (dayNum === 6) {
        day = "Sat"
    } else {
        day = "Sun"
    }

    // Assign month names to monthNum
    if (monthNum === 1) {
        month = "Jan"
    } else if (monthNum === 2) {
        month = "Feb"
    } else if (monthNum === 3) {
        month = "Mar"
    } else if (monthNum === 4) {
        month = "Apr"
    } else if (monthNum === 5) {
        month = "May"
    } else if (monthNum === 6) {
        month = "Jun"
    } else if (monthNum === 7) {
        month = "Jul"
    } else if (monthNum === 8) {
        month = "Aug"
    } else if (monthNum === 9) {
        month = "Sep"
    } else if (monthNum === 10) {
        month = "Oct"
    } else if (monthNum === 11) {
        month = "Nov"
    } else if (monthNum === 12) {
        month = "Dec"
    }

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


// To open private mode
let openIncognitoButton = document.getElementById("openIncognito");
openIncognitoButton.addEventListener('click', function (event) {
    // Don't reload the page
    event.preventDefault();
    if (typeof browser  != 'undefined') {
        browser.windows.create({
            url: ["https://www.google.com/"]
        });
    } else if (typeof chrome  != 'undefined') {
        chrome.windows.create({
            url: ["https://www.google.com/"]
        });
    }
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
                fetch('http://api.weatherapi.com/v1/current.json?key=5f45a1f6e81b45f0b5c74547210604&q=Mumbai&aqi=no')
                .then(function (weatherResponse) {
                    return weatherResponse.json()
                })
                .then(function (weatherData) {
                    let state = weatherData.location.region
                    let lastUpdated = weatherData.current.last_updated
                    let tempC = weatherData.current.temp_c
                    let tempF = weatherData.current.temp_f
                    // console.log(state, lastUpdated, tempC, tempF)

                    document.getElementById("weatherInfo").innerHTML = `
                        <button id="tempC">
                            ${tempC} °C
                        </button>
                        
                    `

                })
            }

        })
}
