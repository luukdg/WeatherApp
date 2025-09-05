let location = "Amsterdam";
let ticketStatus = 0;

const input = document.querySelector(".search");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    location = input.value;
    input.value = "";

    input.blur();
    document.querySelector(".weather").classList.add("weather-reveal");
    document.querySelector(".weather-wrapper").classList.add("transition");
    document.querySelector(".info-wrapper").classList.add("transition");

    getApi(location);
  }
});

async function getApi(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Cfeelslike%2Chumidity%2Cwindspeed%2Cconditions%2Cicon&include=current&key=RWJQU5E5U3KSXSXLDANJF79P6&contentType=json`
    );
    const weatherData = await response.json();
    const currentTempData = weatherData.currentConditions.temp;
    const conditionData = weatherData.currentConditions.conditions;
    const locationData = weatherData.address;
    const feelsLikeData = weatherData.currentConditions.feelslike;
    const windSpeedData = weatherData.currentConditions.windspeed;
    const humidityData = weatherData.currentConditions.humidity;

    if (ticketStatus === 0) {
      document.querySelector(".weather").classList.remove("transition");
      ticketStatus = 1;
    }

    document.querySelector(".condition").textContent = conditionData;
    document.querySelector(".location").textContent = locationData;
    document.querySelector(".temp").textContent = currentTempData.toFixed(0);
    document.querySelector(".feels-like").textContent =
      "Feels like: " + feelsLikeData.toFixed(0) + " °C";
    document.querySelector(".wind").textContent =
      "Wind: " + windSpeedData + " km/h";
    document.querySelector(".humidity").textContent =
      "Humidity: " + humidityData + " %";

    document.querySelector(".weather").classList.remove("weather-reveal");
    document.querySelector(".weather-wrapper").classList.remove("transition");
    document.querySelector(".info-wrapper").classList.remove("transition");
  } catch (err) {
    console.log("Location not found!");
  }
}

getApi(location);
