$(document).ready(function() {
  var origin;
  var destination;

  // function to remove duplicte items out of an array
  var unique = arrArg => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
  };

  // function to get lat and lng and then get cities & states
  function apiCall() {
    localStorage.clear();
    var latLongArray = [];

    var latLong = [];
    var addresses = [];

    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json", //?key=AIzaSyBaNQW3FobOncUto_UN8kX1wDhI8JzJKcA&origin=Atlanta&destination=New%20York%20City",
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        "Postman-Token": "d1fd51bb-4e28-6e70-798b-c0532af76af0"
      }
    };

    settings.url +=
      "?" +
      $.param({
        origin: origin,
        destination: destination,
        key: "AIzaSyBaNQW3FobOncUto_UN8kX1wDhI8JzJKcA"
      });
    //  grab origin and destination when submit is clicked

    // first ajax call to get lat and lng bases on starting point and destination
    $.ajax(settings).done(function(response) {
      var routes = response.routes;
      routes.forEach(function(route) {
        var legs = route.legs;
        legs.forEach(function(leg) {
          var steps = leg.steps;
          steps.forEach(function(step) {
            latLong.push(step.end_location);
          });
        });
      });

      // iterate through latLong array and create an an object with URLS

      latLong.forEach(function(latLong, llindex) {
        var latlng = latLong.lat + "," + latLong.lng;
        var apikey = "AIzaSyB6deBCs1OPwQ3rb4qxP8Y8XHzjwiOELI0";
        var latlngSettings = {
          async: true,
          crossDomain: true,
          url:
            "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json",
          method: "GET"
        };

        // Use $.param to nicely format the url sting
        latlngSettings.url +=
          "?" +
          $.param({
            latlng: latlng,
            key: apikey
          });
        latLongArray.push(latlngSettings);
      }); // end of forEach

      //  Push each response to local storage and store -- will be used later to get city state info
      var citiesArray = [];
      $.when(
        latLongArray.forEach(function(array) {
          $.get(array, function(response) {
            citiesArray.push(response);
            var length = citiesArray.length;
            localStorage.setItem("response" + length, JSON.stringify(response));
            localStorage.setItem("arrayLength", length);
          });
        })
      ).then(function() {
        $("#spinner").hide();
        $("#continue").show();

        //localStorage.setItem("citiesArray", JSON.stringify(citiesArray));          ;
      });
    }); //  closes inital ajax call;
  } // closes apiCall Function

  function getCityState() {
    var cityState = [];
    var city;
    var state;
    var results = [];
    var length = localStorage.getItem("arrayLength");
    localStorage.setItem("citiesAndState", "");
    $.when(function() {
      for (i = 0; i < length; i++) {
        var response = localStorage.getItem("response" + i);
        response = JSON.parse(response);
        if (response) {
          var results = response.results;

          results.forEach(function(result) {
            var address_components = result.address_components;
            address_components.forEach(function(component) {
              if (
                component.types[0] === "locality" &&
                component.types[1] === "political"
              ) {
                if (component.long_name) {
                  city = component.long_name;
                }
              }
              if (
                component.types[0] === "administrative_area_level_1" &&
                component.types[1] === "political"
              ) {
                if (component.short_name) {
                  state = component.short_name;
                  // make sure city or state has a value and !== undefined
                  if (city && state) {
                    cityState.push(city + "," + state);

                    cityState = unique(cityState);

                    localStorage.setItem(
                      "citiesAndState",
                      JSON.stringify(cityState)
                    );
                  }
                }
              }
            });
          });

          //  results.push(response);
          //filterLatLngResponse(response);
        }
      }
    }).then(function() {
      displayCities();
      $("#roadtrip-form-page").toggleClass("show hide");
      $("#city-page").toggleClass("hide show");
    });

    //results = JSON.parse(results);
    //filterLatLngResponse(results);
  } // end of cityState function

  function displayCities() {
    var cityArray = localStorage.getItem("citiesAndState");
    cityArray = JSON.parse(cityArray);
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

  // on click events

  $("#submit").on("click", function(e) {
    e.preventDefault();
    origin = $("#origin-input").val();
    destination = $("#destination-input").val();
    localStorage.clear();
    apiCall();
    $("#submit").hide();
    $("#spinner").show();
  });

  $("#continue").on("click", function(e) {
    cityState = [""];
    e.preventDefault();
    getCityState();
    $("#continue").hide();
    $("#spinner").show();
  });
}); // end of document ready
