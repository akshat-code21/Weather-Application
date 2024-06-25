console.log("This is script.js");

const api_link = "https://api.openweathermap.org/data/2.5/weather";
const api_key = "840dbc63208e7dbfb7d43e23058dc535";

const searchInput = document.getElementById("search");
const cityName = document.getElementById("city-name");
const dateElement = document.getElementById("date");
const weather_icon = document.getElementById("weather-icon");
const temp = document.getElementById("temperature");
const desc = document.getElementById("description");
const wind_speed = document.getElementById("wind-speed");

async function getWeatherData() {
  const city = searchInput.value;
  if (city) {
    const weatherData = await fetchWeatherData(city);
    if (weatherData)
      // console.log('Weather Data Can be found.');
      updateWeatherData(weatherData);
    else console.log("Weather Data not found.");
  }
}
async function fetchWeatherData(city) {
  try {
    const res = await fetch(
      `${api_link}?q=${city}&units=metric&appid=${api_key}`
    );
    if (!res.ok) {
      throw new Error("City not found.");
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    alert("Unable to fetch weather data. Please try again.");
  }
}

async function updateWeatherData(data) {
  const date = new Date();
  cityName.innerText = `${data.name}`;
  dateElement.innerText = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  weather_icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weather_icon.innerHTML = `${data.weather[0].main}`;
  // weather_icon.style.width = '100px';
  weather_icon.style.height = "70px";
  temp.innerHTML = `Temperature : ${data.main.temp}°C`;
  desc.innerHTML = `${data.weather[0].main}`;
  wind_speed.innerHTML = `Wind Speed : ${data.wind.speed}m/s`;
}
