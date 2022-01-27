// removes all searched history from the local storage upon refresh.
localStorage.removeItem("citySearchHistory");

// variable for container that holds everything but the search area.
var mainContainer = document.querySelector("#mainWeather");

// To render only the search button until user inputs a city.
mainContainer.hidden = true;

// .moment used to get clientside's time
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

// variable created to retrieve locally stored city results as an object
var savedCities = JSON.parse(localStorage.getItem("citySearchHistory")) || [];

// Event Listener for search button click
searchBtn.addEventListener("click", function () {
  // To display originally hidden weather display upon users city name input
  mainContainer.hidden = false;

  // variable for getting the users city name input removing any spaces
  var searchedCity = searchbar.value.trim();

  // Takes users city name input and adds it to the savedCities var
  savedCities.push(searchedCity);

  //   Sets into the local storage the stringified search history with the key as citySearchHistory
  localStorage.setItem("citySearchHistory", JSON.stringify(savedCities));

  // Calling the getWeatherInfo Function and createSearchHistory Function Upon the Search Button being clicked via the event listener
  getWeatherInfo(searchedCity);
  createSearchHistory();
});

// Future dates for the future 5 day forecast
$(".day1").text(moment().add(1, "days").format("L"));
$(".day2").text(moment().add(2, "days").format("L"));
$(".day3").text(moment().add(3, "days").format("L"));
$(".day4").text(moment().add(4, "days").format("L"));
$(".day5").text(moment().add(5, "days").format("L"));

// OpenWeather API Key
var apiKey = "bea1f09c5d5807a4bcd9c22e60cd333d";

// Main function that holds all the weather data gathering coding
function getWeatherInfo(city) {
  // Current Weather Data had to be used to get the city(s) location information
  var queryURL1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  // requesting/fetching the data from the above API URL
  fetch(queryURL1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // clearing search bar text after user clicks the search button.
      searchbar.value = "";
      // showName is the variable for the city name thats being requested
      var showName = data.name;
      // Placing the city that was searched into the DOM
      mainDisplayCity.textContent = showName;
      // variables created for the latitude and longitude data
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      //  var for OneCall API URL using temperate literal to input the coordinates of the city selected by user in order to obtain specific city's weather information
      var queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      // requesting/fetching weather data from the API above
      fetch(queryURL2)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          // variable for main weather icon
          var icon = data.current.weather[0].icon;
          // Set attribute of the Main Displayed Icon to be image source from the API
          mainDisplayImage.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon}@2x.png`
          );

          // The requested city's temperature, windspeed and humidity specifically pulled from the available weather data and rendering it on the DOM
          mainTemp.textContent = data.current.temp + " °F";
          mainWindspeed.textContent = data.current.wind_speed + " MPH";
          mainHumid.textContent = data.current.humidity + "%";

          //   UV index data put through an if condition, so that depending on the index's number the specific stylizations will render showing favorable as green, moderate as yellow and severe as red.
          mainUV.textContent = data.current.uvi;

          //   Favorable = green
          if (data.current.uvi <= 3) {
            mainUV.style.backgroundColor = "green";
            mainUV.style.color = "white";
            mainUV.style.padding = "0px 5px 0px 5px";
            mainUV.style.borderRadius = "5px";
          }

          // Moderate = yellow
          if (data.current.uvi > 3) {
            mainUV.style.backgroundColor = "yellow";
            mainUV.style.color = "black";
            mainUV.style.padding = "0px 5px 0px 5px";
            mainUV.style.borderRadius = "5px";
          }

          // Severe = red
          if (data.current.uvi > 5) {
            mainUV.style.backgroundColor = "red";
            mainUV.style.color = "white";
            mainUV.style.padding = "0px 5px 0px 5px";
            mainUV.style.borderRadius = "5px";
          }

          //   variables for the 5 day future forecast icons data
          var icon1 = data.daily[1].weather[0].icon;
          var icon2 = data.daily[2].weather[0].icon;
          var icon3 = data.daily[3].weather[0].icon;
          var icon4 = data.daily[4].weather[0].icon;
          var icon5 = data.daily[5].weather[0].icon;

          // set each of the five day's weather icon as inidividual days attributes in the DOM using temperate literal.
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

          //   Five day forecast temp data specifically called from the API and rendered in the DOM
          day1Temp.textContent = data.daily[1].temp.max + " °F";
          day2Temp.textContent = data.daily[2].temp.max + " °F";
          day3Temp.textContent = data.daily[3].temp.max + " °F";
          day4Temp.textContent = data.daily[4].temp.max + " °F";
          day5Temp.textContent = data.daily[5].temp.max + " °F";

          //   Five day forecast windspeed data specifically called from the API and rendered in the DOM
          day1WS.textContent = data.daily[1].wind_speed + " MPH";
          day2WS.textContent = data.daily[2].wind_speed + " MPH";
          day3WS.textContent = data.daily[3].wind_speed + " MPH";
          day4WS.textContent = data.daily[4].wind_speed + " MPH";
          day5WS.textContent = data.daily[5].wind_speed + " MPH";

          //   Five day forecast humidity data specifically called from the API and rendered in the DOM
          day1Humid.textContent = data.daily[1].humidity + "%";
          day2Humid.textContent = data.daily[2].humidity + "%";
          day3Humid.textContent = data.daily[3].humidity + "%";
          day4Humid.textContent = data.daily[4].humidity + "%";
          day5Humid.textContent = data.daily[5].humidity + "%";
        });
    });
}

// variable cityList created to link the div buttonsearchhistory
var cityList = document.querySelector(".buttonSearchHistory");

// function for the search history info
function createSearchHistory() {
  // left blank so it can be created dynamically
  cityList.innerHTML = "";

  console.log(cityList);

  //when this function runs, it will grab information from the localStorage
  var searchedCityList = JSON.parse(localStorage.getItem("citySearchHistory"));

  // if there is information inside the localstorage and is valid it will set that information to searchHistoryList
  if (searchedCityList !== null) {
    searchHistoryList = searchedCityList;
  }

  // for loop to obtain specific city weather day the user wants to see again
  for (var i = 0; i < searchHistoryList.length; i++) {
    // searched city's results are dynamically created as individual buttons
    var buttonList = document.createElement("button");
    // the text from each city results equals to searchhistorylist's index
    buttonList.textContent = searchHistoryList[i];

    // adds the dynamically created city results button to the DOM in line 35 of the HTML
    cityList.appendChild(buttonList);

    // for loop that counts the number of child elements inside the cityList(buttonSearchHistory)
    for (let i = 0; i <= cityList.childElementCount; i++) {
      // if the child elements of city lists nodelist index exists the event listener will seek out through the array the button of the searched results that was clicked by the user to render that specific cities weather information.
      if (cityList.children.item(i) != null) {
        cityList.children.item(i).addEventListener("click", function () {
          //   console.log(cityList.children.item(i));
          //   console.log(cityList.children.item(i).textContent);
          getWeatherInfo(cityList.children.item(i).textContent);
        });
      }
    }
  }
}
