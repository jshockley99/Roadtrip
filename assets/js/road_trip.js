$(document).ready(function() {

    var latLongArray = [];
    var latLong = [];
    var addresses = [];
    var cityState = [];

    function filterLatLngResponse(response) {

      console.log("You made it to the function ");
      console.log("This is the response in th function " + response);
        
      var results = response;
        results.forEach(function(result, index) {
                  console.log(result.results);

                var components = result.address_components;
                var formattedAddress = result.formatted_address;
                var city;
                var state;
            
               components.forEach(function(component) {

            //console.log(component);

                if (component.types[0] === "locality" && component.types[1] === "political") {
                    if (component.long_name) {
                        city = component.long_name;
                        //console.log(city);

                    }
                }
                if (component.types[0] === "administrative_area_level_1" && component.types[1] === "political") {
                    if (component.short_name) {
                        state = component.short_name;
                        // make sure city or state has a value and !== undefined
                        if (city && state) {
                            cityState.push(city + "," + state);
                         
                        }
                    }
                }
            });  // closes components forEach
       });  // closes results forEach
    // })   // end of obj.forEach 
  //    console.log(cityState);
    }  // end of filterLatLanResponse function   

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyBaNQW3FobOncUto_UN8kX1wDhI8JzJKcA&origin=Atlanta&destination=New%20York%20City",
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "d1fd51bb-4e28-6e70-798b-c0532af76af0"
        }
    }

    // first ajax call to get lat and lng bases on starting point and destination
    $.ajax(settings).done(function(response) {

        var routes = response.routes;
        routes.forEach(function(route) {
            var legs = route.legs
            legs.forEach(function(leg) {
                var steps = leg.steps;
                steps.forEach(function(step) {
                    //console.log(step.end_location);
                    latLong.push(step.end_location);
                });
            });

        });

         

        // iterate through latLong array and create an an object with URLS  
     
        latLong.forEach(function(latLong, llindex) {

            //console.log(latLong.lat + " " + latLong.lng);
            var latlng = latLong.lat + "," + latLong.lng;
            var apikey = 'AIzaSyB6deBCs1OPwQ3rb4qxP8Y8XHzjwiOELI0';            
            var latlngSettings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json",
                    "method": "GET"
            }
            
            // Use $.param to nicely format the url sting
            latlngSettings.url += "?" + $.param({
                'latlng': latlng,
                'key': apikey
            });
            //console.log(latlngSettings);
            latLongArray.push(latlngSettings);
           
    
            
           




            /*
              $.ajax(latlngSettings).done(function(response) {

                results = response.results;
                results.forEach(function(result, index) {
                    var components = result.address_components;
                    var formattedAddress = result.formatted_address;

                    var city;
                    var state;


                    //console.log(result.formatted_address);

                    //addresses.push("{address: " + result.formatted_address + "}");



                    components.forEach(function(component) {

                        //console.log(component);

                        if (component.types[0] === "locality" && component.types[1] === "political") {
                            if (component.long_name) {
                                city = component.long_name;
                                //console.log(city);

                            }
                        }
                        if (component.types[0] === "administrative_area_level_1" && component.types[1] === "political") {
                            if (component.short_name) {
                                state = component.short_name;
                                // make sure city or state has a value and !== undefined
                                if (city && state) {
                                    cityState.push(city + "," + state);
                                    console.log(cityState);



                                }
                            }
                        }


                        // if (city !== undefined  && state !== undefined){
                        //console.log(city + "," + state)
                        // }

                    });

                    // cityState = JSON.stringify(cityState);
                   

                });




            }); //closeses done
  */
          
       

        });   // end of forEach
        var citiesArray= [];
        $.when(
          
            latLongArray.forEach(function (array) {
            $.get(array, function(response) {
              citiesArray.push(response);
               console.log(citiesArray.length);
               var length = citiesArray.length;
               localStorage.setItem("response"+length, JSON.stringify(response));
               localStorage.setItem("arrayLength", length );
              });
            })
         ).then(function() {
          
           console.log("Hey");
        //  console.log(citiesArray );
          

         
          
          localStorage.setItem("citiesArray", JSON.stringify(citiesArray));          ;
         // console.log(newArray);



          

          
         })


        // console.log(latLongArray);



    })  //  closes inital ajax call;
    var city;
    var state;
    var results = [];
    var length = localStorage.getItem("arrayLength");
    console.log(length);

    for (i=0; i < length; i++) {
      var response = localStorage.getItem("response" + i);
     response = JSON.parse(response);
     if (response) {
      console.log(response.results);
      
      var results = response.results;

      results.forEach(function(result) {
        console.log(result.address_components);
        var address_components = result.address_components;
          address_components.forEach(function(component) {
            if (component.types[0] === "locality" && component.types[1] === "political") {
                            if (component.long_name) {
                                city = component.long_name;
                                //console.log(city);

                            }
                        }
                        if (component.types[0] === "administrative_area_level_1" && component.types[1] === "political") {
                            if (component.short_name) {
                                state = component.short_name;
                                // make sure city or state has a value and !== undefined
                                if (city && state) {
                                    cityState.push(city + "," + state);
                                    console.log(cityState);


                                    localStorage.setItem("citiesAndState", JSON.stringify(cityState));

                                }
                            }
                        }
        //    console.log(address_component.types);
          })
      })
      



    //  results.push(response);
    //filterLatLngResponse(response);
  }
    }

  //  console.log(results);
    //results = JSON.parse(results);
    //filterLatLngResponse(results);


   // console.log(localStorageAddress);



  //  console.log(latLong);


}); // end of document ready