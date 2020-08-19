$(document).ready(function(){

// 1. Building the search function for the current city

function searchCity(cityname){
    
    const queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(queryURL);
    });

}

})