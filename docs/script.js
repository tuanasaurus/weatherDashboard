$(document).ready(function(){

// 1. Building the search function for the current city
function searchCity(cityname){
    
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=f4bb47fc7d92ff23a0fb6eb9847131c3";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response){
            console.log(response);

            //A div to put the information we get from the the weather API
            $("#current").empty();

            //Infomration of the city the user is searching for
            const cityName = $("<h3>").text(response.name);
            const temp = $("<p>").text("Temperature:" + response.main.temp);
            const humi = $("<p>").text("Humidity:" + response.main.humidity);
            const wind = $("<p>").text("Wind Speed:" + response.wind.speed);
            const currentWeather = response.weather[0].main;
            // Displaying visual of the current codition with Open Weather App icons (https://openweathermap.org/weather-conditions)
            if (currentWeather === "Rain"){
                const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png")
                currentIcon.attr("style", "height: 50px; width:50px");
            } else if (currentWeather === "Clouds"){
                const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/04d@2x.png")
                currentIcon.attr("style", "height: 50px; width:50px");
            } else if (currentWeather === "Clear"){
                const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png")
                currentIcon.attr("style", "height: 50px; width:50px");
            } else if (currentWeather === "Drizzle"){
                const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d@2x.png")
                currentIcon.attr("style", "height: 50px; width:50px");
            } else if (currentWeather === "Snow"){
                const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13n@2x.png")
                currentIcon.attr("style", "height: 50px; width:50px");
            } 

            const weatherDiv = $("<div>");
            weatherDiv.append(currentIcon, temp, humi, wind);
            $("#current").html(weatherDiv);
        });
    };

})