
if(window.location.hash){
var hashString = window.location.hash.substr(1);

var hashArray = hashString.split( "&" );

console.log( hashArray );

var accessKeyArray = hashArray[0].split("=");
console.log(accessKeyArray);
 var accessToken = accessKeyArray[1];
console.log(accessToken);
}
else{
	//open login modal 
}

$(document).ready(function() {

// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').focus()

//   $("#modal").attr("src", "https://accounts.spotify.com/authorize?client_id=4a7d4aa309ce40a9b644635d2e74b1bb&redirect_uri=https://jshockley99.github.io/Roadtrip&response_type=token&state=123");
// })
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
  

    //get spotify authorisation
    var clientID = "4a7d4aa309ce40a9b644635d2e74b1bb";
    var clientSecret = "e85c7c6bd60c48d1986be1d5b6b3095c";
    var scope = "playlist-modify-public";
    var redirectUri = 'https://jshockley99.github.io/Roadtrip/index.html';
    var spotifyAuthUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientID + '&redirect_uri=' + redirectUri + '&scope=' + scope + '&response_type=token';

    //spotify auth ajax pull on clicking authorise button
    /* $("#spotAuth").on("click", function(event) {
        event.preventDefault();

		window.location = "https://accounts.spotify.com/authorize?client_id=4a7d4aa309ce40a9b644635d2e74b1bb&redirect_uri=https://jshockley99.github.io/Roadtrip&response_type=token&state=123";
        
     });
     */


     //on clicking curate playlist button
     $("#continue").on("click",function(){
     	//take value from selection on form and get city

     	//get city from array parsed from localStorage
     	/*var cityStArray = ["Atlanta,GA", "Charlotte,NC", "New York,NY"]
     	for (var i = 0; i < cityStArray.length; i++) {
     		var splitCityStArrays = cityStArray[i].split(",");
          console.log(splitCityStArray);
          var city = splitCityStArray[0];
          console.log(city);
     	}
     */

     //call spotify and get corresponding playlist

     var city = "charlotte";
    $.ajax({
       url: 'https://api.spotify.com/v1/browse/categories/'+city+'/playlists',
       headers: {
           'Authorization': 'Bearer ' + accessToken,
       },
       success: function(response) {
       	var data = response.playlists.items;
           console.log(data);
		
		//display playlist in browser
         
       }
    });
    });


});