

$(document).ready(function () {


	var apiKey = "AIzaSyBaNQW3FobOncUto_UN8kX1wDhI8JzJKcA"
	var queryURL = "https://maps.googleapis.com/maps/api/directions/json"
	
	// Use $.param to nicely format the url sting
	queryURL += "?" + $.param({           
		'origin': "Atlanta",
		'destination': "New York City", 
		'key': apiKey
		
	});

console.log(queryURL);

	$.ajax({
	  url: 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyCF5c2ISZ8-lpbZ3eTYEEHlfjd3-AxmXS0&Origin="anonymous"',
	}).done(function(result) {	
	  console.log(result);    
	  	
	}).fail(function(err) {
	  throw err;
	});




});



	