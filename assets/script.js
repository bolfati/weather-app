var today = dayjs();
var currentTime = today.format('YYYY-MM-DD HH:mm:ss');
console.log(currentTime);
$('#currentDay').text(today.format('MMM D, YYYY')); //big day on page

$("#searchButton").click(function(event) {
  event.preventDefault();
  var inputElement = $("#searchInput");
  var cityName = inputElement.val();
  console.log(cityName);

  var encodedCityName = encodeURIComponent(cityName);
  var currentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + encodedCityName + "&appid=79e2f8f238c3f0c5a9939235bf1be641";
  var futureDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + encodedCityName + "&appid=79e2f8f238c3f0c5a9939235bf1be641";
  console.log(futureDay);
  console.log(currentDay);

  fetch(currentDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var windSpeed = data.wind.speed;
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var temperatureFixed = (temperature - 273.15) * 9/5 + 32;
      console.log(windSpeed);
      console.log(humidity);
      console.log(temperatureFixed);

      $("#currentWind").text("Wind Speed: " + windSpeed + " m/s");
      $("#currentTemp").text("Temperature: " + temperatureFixed + " F");
      $("#currentHumidity").text("Humidity: " + humidity + " %");

      return fetch(futureDay)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          for (var i = 0; i < 5; i++) {
            var forecastResults = data.list[i];
            var futureWind = forecastResults.wind.speed;
            var futureHumidity = forecastResults.main.humidity;
            var temp = forecastResults.main.temp;
            var futureTemp = Math.floor(temp - 273.15) * 9/5 + 32;

            console.log(forecastResults);
            console.log(futureWind);
            console.log(futureHumidity);

            var tempFixed = futureTemp
            var targetElement = $(".day" + (i + 1));
            targetElement.find("#futureWind").text("Wind Speed: " + futureWind + " m/s");
            targetElement.find("#futureTemp").text("Temperature: " + tempFixed + " F");
            targetElement.find("#futureHumidity").text("Humidity: " + futureHumidity + " %");

            console.log(targetElement);
          }
        });
    })
    .catch(function (error) {
      console.log(error);
});
});