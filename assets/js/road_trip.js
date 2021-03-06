if (window.location.hash) {
  var hashString = window.location.hash.substr(1);
  var hashArray = hashString.split("&");
  var accessKeyArray = hashArray[0].split("=");
  var accessToken = accessKeyArray[1];
} else {
  //alert("You need to Authorise Spotify"); //use modal instead
}
$(document).ready(function() {
  //declare global variables
  var userId;
  var cityPlaylist = {};
  var city;
  var currentPlaylistId;
  var playlistArray = [];
  var playlistOwner;

  //function to get user id
  function getUserId() {
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      success: function(response) {
        userId = response.id;
      } //ends success function
    }); //ends ajax call
  } //ends getuserid function

  //spotify auth redirect on clicking authorise button
  $("#spotAuth").on("click", function(event) {
    event.preventDefault();
    // window.location =
    //   "https://accounts.spotify.com/authorize?client_id=4a7d4aa309ce40a9b644635d2e74b1bb&redirect_uri=https://ovie4.github.io/Roadtrip-Spotify-API-testing/&response_type=token&state=123";

    window.location =
      "https://accounts.spotify.com/authorize?client_id=4a7d4aa309ce40a9b644635d2e74b1bb&redirect_uri=https://jshockley99.github.io/Roadtrip&response_type=token&state=123";

    $("#landing-page").toggleClass("show hide");
    //    $("#roadtrip-form-page").toggleClass("hide show");
  }); //ends spotify authorisation

  //get user ID after authentication
  getUserId();

  // function sets the clicked table row to 'active' and
  // sets all other rows to 'inactive'
  // *enhancement* can be updated for multiple 'active' selections
  $("#city-table tbody").on("click", "tr", function() {
    $(this).toggleClass("selected deselected");
    $(this)
      .siblings()
      .attr("class", "deselected");
    var b = $(".selected").attr("data-item-city");
  });

  //whatever is passed from the click event
  //for each city ,call spotify and get corresponding playlist
  $("#curate").on("click", function() {
    $("#city-page").toggleClass("show hide");
    $("#playlist-page").toggleClass("hide show");

    function getCityPlaylistObj() {
      //take value from selection on form and get city
      playlistArray = [];
      cityRaw = $(".selected").attr("data-item-city");
      city = cityRaw.toLowerCase();
      //create new array of playlists
      $.ajax({
        url: "https://api.spotify.com/v1/search?q=" + city + "&type=playlist",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        success: function(response) {
          console.log(response);
          var data = response.playlists.items;
          //loop through data array and push new playlists into playlist array
          for (var i = 0; i < data.length; i++) {
            var playlistID = data[i].id;
            var playlistCreator = data[i].owner.id;
            var playlistAndCreatorArray = [playlistID, playlistCreator];
            playlistArray.push(playlistAndCreatorArray);
          }

          //create object using city and playlistArray as key value pairs
          cityPlaylist[city] = playlistArray;
          return playlistArray;
        } //end ajax call function
      }); //end ajax call
    } //end getCityPlaylistObj function

    getCityPlaylistObj();

    //function to randomise playlist selection
    function randomPlaylistSel() {
      //check to see which city was clicked

      // get a random value from the corresponding array
      var randomiser = Math.round(Math.random() * playlistArray.length);
      //
      var currentPlaylistId = playlistArray[randomiser][0];
      var playlistOwner = playlistArray[randomiser][1];
      //
      var iframeReqs =
        ' width="300" height="380" frameborder="0" allowtransparency="true"';
      //
      var iframeURL = "https://open.spotify.com/embed/user/";
      iframeURL +=
        +playlistOwner + ":playlist:" + currentPlaylistId + iframeReqs;
      //
      var finalIframe = $("<iframe>");
      finalIframe.attr("src", "iframeURL");
      return finalIframe;
    } //end of randomPlaylistSel

    randomPlaylistSel();

    $("#playlist-page").html(finalIframe);

    setTimeout(randomPlaylistSel, 5000);
  }); //ends continue button click listener
}); //ends document ready

//get spotify authorisation
//var clientID = "4a7d4aa309ce40a9b644635d2e74b1bb";
//var clientSecret = "e85c7c6bd60c48d1986be1d5b6b3095c";
//var scope = "playlist-modify-public";
//var redirectUri = 'https://ovie4.github.io/Roadtrip-Spotify-API-testing/index.html';
//var spotifyAuthUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientID + '&redirect_uri=' + redirectUri + '&scope=' + scope + '&response_type=token';
