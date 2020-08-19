$(document).ready(function(){

// 1. Building the search function for the current city
function searchCity(cityname){
    
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=d8c4db3ea11ec8a0efa1ef9c8666f8cd";
    const queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=d8c4db3ea11ec8a0efa1ef9c8666f8cd";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        //A div to put the information we get from the the weather API
        $("#current").empty();

        //Infomration of the city the user is searching for
        const cityName = $("<h3>").text(response.name);
        const temp = $("<p>").text("Temperature:" + response.main.temp);
        const humi = $("<p>").text("Humidity:" + response.main.humidity);
        const wind = $("<p>").text("Wind Speed:" + response.wind.speed);
        const currentWeather = response.weather[0].main;
        // Displaying visual of the current codition with Open Weather App icons (https://openweathermap.org/weather-conditions)
        let currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/04d@2x.png");
        if (currentWeather === "Rain"){
            currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png")
            currentIcon.attr("style", "height: 50px; width:50px");
        } else if (currentWeather === "Clouds"){
            currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/04d@2x.png")
            currentIcon.attr("style", "height: 50px; width:50px");
        } else if (currentWeather === "Clear"){
            currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png")
            currentIcon.attr("style", "height: 50px; width:50px");
        } else if (currentWeather === "Drizzle"){
            currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d@2x.png")
            currentIcon.attr("style", "height: 50px; width:50px");
        } else if (currentWeather === "Snow"){
            currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13n@2x.png")
            currentIcon.attr("style", "height: 50px; width:50px");
        } 

        const newDiv = $('<div>');
        newDiv.append(cityName, currentIcon, temp, humi, wind);
        $("#current").html(newDiv);


// UV lookup
        const lat = response.coord.lat;
        const lon = response.coord.lon;
        const queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?&appid=d8c4db3ea11ec8a0efa1ef9c8666f8cd&lat=" + lat  + "&lon=" + lon;
            $.ajax({
                url: queryURLUv,
                method: "GET"
            }).then(function (response){
                $("#uvl-display").empty();
                const uvlResults = response.value;
                const uvl = $("<button class='btn bg-success'>").text("UV Index:" + response.value);
                $("#uvl-display").html(uvl);
            });
        });


// 5-Day Forecast
        $.ajax({
            url: queryURLForecast,
            method: "GET"
        }).then(function (response){
            const results = response.list;
            $("#fiveDays").empty();
            for (var i = 0; i < results.length; i += 8){
                const fiveDayDiv = $("<div class='card shadow-md text-white bg-primary mb-10 p-2 col col-sm' style='height: 12rem;'>");

                const date = results[i].dt_txt;
                const setD = date.substr(0,10)
                const temp = results[i].main.temp;
                const humi = results[i].main.humidity;

                const h5Date = $("<h6 class='card-title'>").text(setD);
                const pTemp = $("<p class='card-text'>").text("Temperature:" + temp);
                const pHumi = $("<p class='card-text'>").text("Humidity:" + humi);

                const weather = results[i].weather[0].main;
                
                let icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/04d@2x.png");
                if (weather === "Rain"){
                    icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png")
                    icon.attr("style", "height: 30px; width:30px");
                } else if (weather === "Clouds"){
                    icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/04d@2x.png")
                    icon.attr("style", "height: 30px; width:30px");
                } else if (weather === "Clear"){
                    icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png")
                    icon.attr("style", "height: 30px; width:30px");
                } else if (weather === "Drizzle"){
                    icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d@2x.png")
                    icon.attr("style", "height: 30px; width:30px");
                } else if (weather === "Snow"){
                    icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13n@2x.png")
                    icon.attr("style", "height: 30px; width:30px");
                } 

                fiveDayDiv.append(h5Date);
                fiveDayDiv.append(icon);
                fiveDayDiv.append(pTemp);
                fiveDayDiv.append(pHumi);
                $("#fiveDays").append(fiveDayDiv);
            }
        });    
}


// Event handler for the city being search for
$("#select-city").on("click", function(event){
    event.preventDefault();
    const cityInput = $("#city-input").val().trim();
    const textContent = $(this).siblings("input").val();
    const storeArr = [];
    storeArr.push(textContent);
    localStorage.setItem("cityName", JSON.stringify(storeArr));
    searchCity(cityInput);
    pageContent();
});

// Function for grabbing the last search item from local storage
function pageContent(){
    const lastSearch = JSON.parse(localStorage.getItem("cityName"));
    const lastSearchBtn = $("<button class='btn border text-muted mt=1 shadow-sm bg-grey rounder' style='width: 16rem;'>").text(lastSearch);
    const lastSearchDiv = $("<div>");
    lastSearchDiv.append(lastSearchBtn)
    $("#searchHistory").prepend(lastSearchDiv);
}

$("#searchHistory").on("click", ".btn", function(event){
    event.preventDefault();
    searchCity($(this).text());
});

})