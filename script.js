function getWeather() {
  const apiKey = "effc621d2af710a655b12f2148e9d2a7";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("please enter a city");
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  //current wheather
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("the current wheather data:", data);
      displayWeather(data); //pass this data to this function
    })
    .catch((error) => {
      console.error("error fetching the data", error);
      alert("error fetching data please try again!!!");
    });

  //24 hour wheather data
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("the 24 hour wheather data:", data);
      displayHourlyForecast(data.list); //pass this data to this function
    })
    .catch((error) => {
      console.error("error in fetching 24 hour data", error);
      alert("error in fetchin the 24 hour wheather data");
    });
}

function displayWeather(data) {
  const temperatureDiv = document.getElementById("temperature-div");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherInfoDiv = document.getElementById("weather-info");
  const hourlyForecast = document.getElementById("hourly-forecast");

  temperatureDiv.innerHTML = "";
  weatherInfoDiv.innerHTML = "";
  hourlyForecast.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = "<p>{data.message}</p>"; //if not valid city
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHtml = `<p>${temperature}°C</p>`;
    const weatherHtml = `
    <p>${cityName}</p>
    <p>${description}</p>
    `;
    temperatureDiv.innerHTML = temperatureHtml;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(data) {
  const hourlyForecast = document.getElementById("hourly-forecast");
  const next24hrs = data.slice(0, 8);

  next24hrs.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hours = dateTime.getHours();

    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyHtml = `
    <div class="hourly-item">
      <p>${hours}:00</p>
      <img src="${iconUrl}" alt="weather">
      <p>${temperature}°C</p>
    </div>
    `;

    hourlyForecast.innerHTML += hourlyHtml;
  });
}

function showImage() {
  const Image = document.getElementById("weather-icon");
  Image.style.display = "block";
}
