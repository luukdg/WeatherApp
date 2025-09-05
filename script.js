let location;

const input = document.querySelector(".search");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    location = input.value;
    input.value = "";
    getApi(location);
  }
});

async function getApi(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Cfeelslike%2Chumidity%2Cwindspeed%2Cconditions%2Cicon&include=current&key=RWJQU5E5U3KSXSXLDANJF79P6&contentType=json`
    );
    const weatherData = await response.json();
    console.log(weatherData);
    const currentTempData = weatherData.currentConditions.temp;
    const conditionData = weatherData.currentConditions.conditions;
    const locationData = weatherData.address;
    const feelsLikeData = weatherData.currentConditions.feelslike;
    const windSpeedData = weatherData.currentConditions.windspeed;
    const humidityData = weatherData.currentConditions.humidity;

    console.log("Temperature:", currentTempData);
    console.log("Condition:", conditionData);
    console.log("Location:", locationData);
    console.log("Feels Like:", feelsLikeData);
    console.log("Wind Speed:", windSpeedData);
    console.log("Humidity:", humidityData);
  } catch (err) {
    console.log("Location not found!");
  }
}
