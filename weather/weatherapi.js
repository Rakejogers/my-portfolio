
let locationKey;
let rain;

// Select the form element
const form = document.querySelector("#zip");
const locBtn = document.getElementById("locBtn")

// Add a submit event listener to the form
form.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Access the value of the input field
  const zipcode = event.target.elements.zipcode.value;

  // Log the value of the input field to the console
  fetchLocation(zipcode);
});

locBtn.addEventListener("click", getLoc);
function getLoc(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        document.getElementById("weathertext").innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        fetch('https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=kGm2xsyj6i8GhjGg0aRRqWAQbbW5TDZV&q=' + position.coords.latitude + "%2C" + position.coords.longitude)
            .then(async data => {
            //handle data
            const parse = await data.json();
            let locationData = parse
            let location = locationData.LocalizedName + ", " + locationData.Country.LocalizedName
            locationKey = locationData.Key
            fetchWeather(locationKey, location)
        })
    }
}

function fetchWeather(Key, place){
    fetch('https://dataservice.accuweather.com/currentconditions/v1/' + Key + '?apikey=kGm2xsyj6i8GhjGg0aRRqWAQbbW5TDZV')
        .then(async data => {
        //handle data
        const parse = await data.json();
        let weatherdata = parse[0]

        if (weatherdata.HasPrecipitation == false){
            rain = "No!"
        } else {
            rain = "Yes. :("
        }

        document.getElementById("weathertext").innerHTML = "Weather Type: " + weatherdata.WeatherText
        document.getElementById("precip").innerHTML = "Is it raining? " + rain
        document.getElementById("temp").innerHTML = "Temperature: " + JSON.stringify(weatherdata.Temperature.Imperial.Value) + " F"
        document.getElementById("location").innerHTML = place
        document.getElementById("time").innerHTML = weatherdata.LocalObservationDateTime
        document.getElementById("weatherlink").setAttribute("href", weatherdata.Link)
        document.querySelectorAll(".hidden").forEach(e=>e.classList.remove("hidden"))
        
    })
        .catch(error => {
        //handle error
        document.getElementById("weathertext").innerHTML = "Error. Try Again Later."
    });
}

function fetchLocation(zip){
    fetch('https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=kGm2xsyj6i8GhjGg0aRRqWAQbbW5TDZV&q=' + zip)
        .then(async data => {
        //handle data
        const parse = await data.json();
        let locationData = parse[0]
        let location = locationData.LocalizedName + ", " + locationData.Country.LocalizedName
        locationKey = locationData.Key
        fetchWeather(locationKey, location)
    })

}






