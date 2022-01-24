$("#date").text(moment().format("(L)"));

// getElementById('#date').text(moment().format('(L)'));

// Search Bar & Results history Selectors
var searchbar = document.querySelector(".searchbar");
var searchBtn = document.querySelector("#searchBtn");
var searchHistory = document.querySelector("#searchResults");

// Top Row Main City & Weather Section Selectors
var mainDisplayCity = document.querySelector(".city");
var mainDisplayImage = document.querySelector(".w-icon");
var mainTemp = document.querySelector("#temperature");
var mainHumid = document.querySelector("#humidity");
var mainWindspeed = document.querySelector("#windSpeed");
var mainUV = document.querySelector("#uvIndex");

// 5day Forecast Selectors
var all5Days = document.querySelectorAll(".weather5Day");

// tomorrow weather display - 5day forcast section
var day1Forecast = document.querySelector(".day1");
var day1Icon = document.querySelector(".w-icon1");
var day1Temp = document.querySelector(".temp1");
var day1WS = document.querySelector(".windspeed1");
var day1Humid = document.querySelector(".humid1");

// day2 weather display
var day2Forecast = document.querySelector(".day2");
var day2Icon = document.querySelector(".w-icon2");
var day2Temp = document.querySelector(".temp2");
var day2WS = document.querySelector(".windspeed2");
var day2Humid = document.querySelector(".humid2");

// day3 weather display
var day3Forecast = document.querySelector(".day3");
var day3Icon = document.querySelector(".w-icon3");
var day3Temp = document.querySelector(".temp3");
var day3WS = document.querySelector(".windspeed3");
var day3Humid = document.querySelector(".humid3");

// day4 weather display
var day4Forecast = document.querySelector(".day4");
var day4Icon = document.querySelector(".w-icon4");
var day4Temp = document.querySelector(".temp4");
var day4WS = document.querySelector(".windspeed4");
var day4Humid = document.querySelector(".humid4");


// day5 weather display
var day5Forecast = document.querySelector(".day5");
var day5Icon = document.querySelector(".w-icon5");
var day5Temp = document.querySelector(".temp5");
var day5WS = document.querySelector(".windspeed5");
var day5Humid = document.querySelector(".humid5");

// var currentWeatherEl = document.getElementById('#currentWeather');

searchBtn.addEventListener("click", function () {
  var searchedCity = searchbar.value.trim();

  var savedCities = JSON.parse(localStorage.getItem("citySearchHistory")) || [];

  savedCities.push(searchedCity);

  localStorage.setItem("citySearchHistory", JSON.stringify(savedCities));

  getWeatherInfo(searchedCity);
  createSearchHistory();
});


// var searchedCityList = localStorage.getItem("citySearchHistory");
// searchHistory.append(JSON.parse(searchedCityList));

// local storage not working!!!

var apiKey = "bea1f09c5d5807a4bcd9c22e60cd333d";

function getWeatherInfo(city) {
  var queryURL1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(queryURL1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      var showName = data.name;

      mainDisplayCity.textContent = showName;

      var lat = data.coord.lat;
      var lon = data.coord.lon;

      var queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

      fetch(queryURL2)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);

          var icon = data.current.weather[0].icon

          mainDisplayImage.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);

          mainTemp.textContent = data.current.temp;
          mainHumid.textContent = data.current.humidity;
          mainWindspeed.textContent = data.current.wind_speed;
          mainUV.textContent = data.current.uvi;
        // add 5 day forecast
        });
    });
}

var searchHistoryList = [];

var cityList = document.querySelector(".buttonSearchHistory")


function createSearchHistory() {

    cityList.innerHTML = "";

    for (var i = 0; i < searchHistoryList.length; i++) {
        var citySearchList = searchHistoryList[i];

        var buttonList = document.createElement("button");
        buttonList.textContent = citySearchList;
        cityList.setAttribute("citySearchHistory", i);

        cityList.appendChild(buttonList);
        
        init()
    }

function init() {
    var searchedCityList = JSON.parse(localStorage.getItem("citySearchHistory"));

    if (searchedCityList !== null) {
        searchHistoryList = searchedCityList;
    }

    createSearchHistory();
}
    // searchHistory.append(JSON.parse(searchedCityList));

    // var savedCities = JSON.parse(localStorage.getItem("citySearchHistory"));

    // if (savedCities !== null) {}
    // console.log(savedCities)
}


