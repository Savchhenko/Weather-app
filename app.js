const api = "129e1c7879b4a2b769fb2d9f4783286e";

let data = document.getElementById("search-txt");
let searchButton = document.getElementById("loupe");
let cityName = document.getElementById("one-col");
let temperature = document.getElementById("two-col");
let humidity = document.getElementById("three-col");
let icon = document.getElementById("icon");

searchButton.addEventListener("click", findWeatherDetails);
data.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (data.value === "") {

    }else {
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + data.value + "&appid="+api;
        httpRequestAsync(searchLink, theResponse);
    }
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = "T: " + parseInt(jsonObject.main.temp - 273) + "°";
    humidity.innerHTML = "  H: " + jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback)
{
    console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}