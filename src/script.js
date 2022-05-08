function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement = response.data.main.humidity;
  let windyElement = document.querySelector("#windy");
  windyElement = Math.round(response.data.main.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(new Date(response.data.dt * 1000));
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "6d14bf3fa5db85996e16c81f2734587e";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value, "imperial");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celsius = document.queryselector("#celsius");
celsius.addEventListener("click", search);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);
