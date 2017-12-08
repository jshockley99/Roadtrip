
$(document).ready(function() {

// hardcoded array of cities, replace with Google local storage data
var cityArray = ["Atlanta, GA", "Greenville, SC", "Spartanburg, SC", "Charlotte, NC", "Durham, NC", "Richmond, VA", "Washington D.C", "Baltimore, MD", "Philadelphia, PA"]

// function to display each Google city in a table on the page
function displayCities () {
    $("#city-list").empty();
    for (var i = 0; i < cityArray.length; i++) {
        var cityRow = $("<tr>");
        var cityCell = $("<td>");
        var cityState = cityArray[i];
        var citySplit = cityState.split(",");
        var city = citySplit[0];
        cityRow.addClass("deselected");        
        cityRow.attr("data-item-city", city);
        cityCell.append(cityState);
        cityRow.append(cityCell);
        $("#city-list").append(cityRow);
    }
}

// this click listener will need to be updated to trigger after 
//second Google AJAX call, (?within continue button?)
$("#submit").on("click", function(e) {
    event.preventDefault ();
    displayCities ();
});

// function sets the clicked table row to 'active' and 
// sets all other rows to 'inactive'
// *enhancement* can be updated for multiple 'active' selections
$("#city-table tbody").on("click", "tr", function () { 
    $(this).toggleClass("selected deselected");
    $(this).siblings().attr("class", "deselected");   
var b = $(".selected").attr("data-item-city");
console.log(b);
});

// city variable needed for Spotify query
// *enhancement* will need updates if allowing multiple selections
var city = $(".selected").attr("data-item-city");
console.log(city);

});