

var hashString = window.location.hash.substr(1);

var hashArray = hashString.split( "&" );

console.log( hashArray );

var accessKeyArray = hashArray[0].split("=");
console.log(accessKeyArray);
 var accessKey = accessKeyArray[1];
console.log(accessKey);

$(document).ready(function() {

    /*
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

    */

    //spotify api calls
    //for each city, use spotify url to get playlists

    //get spotify authorisation
    var clientID = "4a7d4aa309ce40a9b644635d2e74b1bb";
    var clientSecret = "e85c7c6bd60c48d1986be1d5b6b3095c";
    var scope = "playlist-modify-public";
    var redirectUri = 'https://jshockley99.github.io/Roadtrip/index.html';
    var spotifyAuthUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientID + '&redirect_uri=' + redirectUri + '&scope=' + scope + '&response_type=token';

    //spotify auth ajax pull on clicking authorise button
     $("#spotAuth").on("click", function(event) {
        event.preventDefault();

		window.location = "https://accounts.spotify.com/authorize?client_id=4a7d4aa309ce40a9b644635d2e74b1bb&redirect_uri=https://jshockley99.github.io/Roadtrip&response_type=token&state=123";
        
   
     	 //var token = window.location.hash.substr(1);
	    // console.log(token);
         //    method: "GET",
         //     url: 'https://cors-anywhere.herokuapp.com/' + spotifyAuthUrl
         // }).done(function(response) {
         // 	console.log(response);
         //     window.location.href(response);
         // });
     });


     	
    /*var accessToken = 'BQDefyVOD_4MEBrMlMoVYU3Zl8klNnlJ62_cCTNfrwqekhDr1v9C7MJqikb4jShwGDz2g117ZgyHNUCkchGuBvtQLXO1CxX2LMKhF2mwcgS7RKbu1_0s_16xUiaRfvEKGMaQE-TF'
    $.ajax({
       url: 'https://api.spotify.com/v1/me',
       headers: {
           'Authorization': 'Bearer ' + accessToken
       },
       success: function(response) {
           console.log(response);
       }
    });
    */


});