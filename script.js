localStorage.removeItem("citySearchHistory");

var mainContainer = document.querySelector("#mainWeather");

mainContainer.hidden = true;

$("#date").text(moment().format("(L)"));

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

var savedCities = JSON.parse(localStorage.getItem("citySearchHistory")) || [];

searchBtn.addEventListener("click", function () {

    mainContainer.hidden = false;

  var searchedCity = searchbar.value.trim();

  savedCities.push(searchedCity);

  localStorage.setItem("citySearchHistory", JSON.stringify(savedCities));

  getWeatherInfo(searchedCity);
  createSearchHistory();
});

$(".day1").text(moment().add(1, "days").format("L"));
$(".day2").text(moment().add(2, "days").format("L"));
$(".day3").text(moment().add(3, "days").format("L"));
$(".day4").text(moment().add(4, "days").format("L"));
$(".day5").text(moment().add(5, "days").format("L"));

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
      searchbar.value = "";

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
          var icon = data.current.weather[0].icon;

          mainDisplayImage.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon}@2x.png`
          );

          mainTemp.textContent = data.current.temp + " °F";
          mainWindspeed.textContent = data.current.wind_speed + " MPH";
          mainHumid.textContent = data.current.humidity + "%";

          mainUV.textContent = data.current.uvi;

          if (data.current.uvi <= 3) {
            mainUV.style.backgroundColor = "green";
            mainUV.style.color = "white";
            mainUV.style.padding = "0px 5px 0px 5px";
            mainUV.style.borderRadius = "5px";
          }

          if (data.current.uvi > 3) {
            mainUV.style.backgroundColor = "yellow";
            mainUV.style.color = "black";
            mainUV.style.padding = "0px 5px 0px 5px";
            mainUV.style.borderRadius = "5px";
          }

          if (data.current.uvi > 5) {
            mainUV.style.backgroundColor = "red";
            mainUV.style.color = "white";
            mainUV.style.padding = "0px 5px 0px 5px";
            mainUV.style.borderRadius = "5px";
          }

          var icon1 = data.daily[1].weather[0].icon;
          var icon2 = data.daily[2].weather[0].icon;
          var icon3 = data.daily[3].weather[0].icon;
          var icon4 = data.daily[4].weather[0].icon;
          var icon5 = data.daily[5].weather[0].icon;

          day1Icon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon1}.png`
          );

          day2Icon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon2}.png`
          );

          day3Icon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon3}.png`
          );

          day4Icon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon4}.png`
          );

          day5Icon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon5}.png`
          );

          day1Temp.textContent = data.daily[1].temp.max + " °F";
          day2Temp.textContent = data.daily[2].temp.max + " °F";
          day3Temp.textContent = data.daily[3].temp.max + " °F";
          day4Temp.textContent = data.daily[4].temp.max + " °F";
          day5Temp.textContent = data.daily[5].temp.max + " °F";

          day1WS.textContent = data.daily[1].wind_speed + " MPH";
          day2WS.textContent = data.daily[2].wind_speed + " MPH";
          day3WS.textContent = data.daily[3].wind_speed + " MPH";
          day4WS.textContent = data.daily[4].wind_speed + " MPH";
          day5WS.textContent = data.daily[5].wind_speed + " MPH";

          day1Humid.textContent = data.daily[1].humidity + "%";
          day2Humid.textContent = data.daily[2].humidity + "%";
          day3Humid.textContent = data.daily[3].humidity + "%";
          day4Humid.textContent = data.daily[4].humidity + "%";
          day5Humid.textContent = data.daily[5].humidity + "%";
        });
    });
}

var searchHistoryList = [];

var cityList = document.querySelector(".buttonSearchHistory");

function createSearchHistory() {
  cityList.innerHTML = "";

  console.log(cityList);

  //whenthis function runs, it will grab information from the localStorage
  var searchedCityList = JSON.parse(localStorage.getItem("citySearchHistory"));

  if (searchedCityList !== null) {
    searchHistoryList = searchedCityList;
  }
 
  for (var i = 0; i < searchHistoryList.length; i++) {
    var buttonList = document.createElement("button");
    buttonList.textContent = searchHistoryList[i];

    cityList.appendChild(buttonList);

    for (let i = 0; i <= cityList.childElementCount; i++) {
      cityList.appendChild(buttonList);
      if (cityList.children.item(i) != null) {
        cityList.children.item(i).addEventListener("click", function () {
          console.log(cityList.children.item(i));
          console.log(cityList.children.item(i).textContent);
          getWeatherInfo(cityList.children.item(i).textContent);
        });
      }
    }
  }
}

function init() {
  createSearchHistory();
}

init(); 
