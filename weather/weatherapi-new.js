
let locationKey;

// Select the form element
const form = document.querySelector("#city-input");
// const locBtn = document.getElementById("locBtn")
const title_label = document.getElementById("title");
const temp_label = document.getElementById("temp");
const city_label = document.getElementById("current-city");
const date_label = document.getElementById("time");
//create constiables for elements with ids high, low, wind, cloud-cover, humidity
const high_label = document.getElementById("high");
const low_label = document.getElementById("low");
const wind_label = document.getElementById("wind");
const cloud_cover_label = document.getElementById("cloud-cover");
const humidity_label = document.getElementById("humidity");
const icon = document.getElementById("big-icon");

const weatherkey = 'IdJeASBDRnCuUhGipjhAKEkK2bvDR8eu';


// when the webpage loads fetch the user location and getLoc
window.onload = function() {
    getLoc()
};

//when user hits enter on input with id="city-input" call the function fetchLocation
form.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const zip = form.value;
        fetchLocation(zip);
    }
});

// locBtn.addEventListener("click", getLoc);

function getLoc(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        // show alert message for location not working
        alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
        fetch('https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=' + weatherkey + '&q=' + position.coords.latitude + "%2C" + position.coords.longitude)
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
    fetch('https://dataservice.accuweather.com/currentconditions/v1/' + Key + '?apikey=' + weatherkey + '&details=true')
        .then(async data => {
        //handle data
        const parse = await data.json();
        let weatherdata = parse[0]

        if (weatherdata.HasPrecipitation == false){
            icon.classList = "fas fa-sun text-yellow-400"
        } else if (weatherdata.PrecipitationType == "Rain") {
            icon.classList = "fas fa-cloud-rain test-gray-900"
        } else if (weatherdata.PrecipitationType == "Snow") {
            icon.classList = "fas fa-snowflake text-blue-300"
        } else if (weatherdata.PrecipitationType == "Ice") {
            icon.classList = "fas fa-icicles text-blue-300"
        } else{
            icon.classList = "fas fa-cloud text-gray-900"
        }

        title_label.innerHTML = weatherdata.WeatherText;

        temp_label.innerHTML = JSON.stringify(weatherdata.Temperature.Imperial.Value) + "\u00B0F";

        city_label.innerHTML = place;

        let date = new Date().toLocaleDateString();
        date_label.innerHTML = date;

        high_label.innerHTML = "6 Hour High: " + JSON.stringify(weatherdata.TemperatureSummary.Past12HourRange.Maximum.Imperial.Value) + "\u00B0F";
        low_label.innerHTML = "6 Hour Low: " + JSON.stringify(weatherdata.TemperatureSummary.Past12HourRange.Minimum.Imperial.Value) + "\u00B0F";

        wind_label.innerHTML = "Wind Speed: " + JSON.stringify(weatherdata.Wind.Speed.Imperial.Value) + " mph";
        cloud_cover_label.innerHTML = "Cloud Cover: " + JSON.stringify(weatherdata.CloudCover) + "%";
        humidity_label.innerHTML = "Humidity: " + JSON.stringify(weatherdata.RelativeHumidity) + "%";

        // document.getElementById("weatherlink").setAttribute("href", weatherdata.Link)
        
    })
        .catch(error => {
        //handle error
        document.getElementById("title").innerHTML = "Error. Try Again Later."
        console.log(error)
    });
}

function fetchLocation(city){
    fetch('https://dataservice.accuweather.com/locations/v1/cities/US/search?apikey=' + weatherkey + '&q=' + city)
        .then(async data => {
        //handle data
        const parse = await data.json();
        let locationData = parse[0]
        let location = locationData.LocalizedName + ", " + locationData.Country.LocalizedName
        locationKey = locationData.Key
        console.log(location)
        fetchWeather(locationKey, location)
    })

}






