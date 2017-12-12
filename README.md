# Project Title: RoadTrip

Contributors: 
Julie Shockley, Ovie Omene, Peter Fullen, Janessa Hanna 

Project Description: 
Our app creates a music playlist based on a user's road trip route. The user inputs a starting location and end location. Then the app generates a playlist based on cities along the route. 

APIs Used:
* Google Maps
* Spotify (requires auth)

Design process:
* We initially spent time brainstorming ideas, doing high level research and landing on a final idea. We landed on the RoadTrip app because  we all agreed that it had the highest level of usability.
* In the next stage of the project, we came up with the process flow and created our user stories.
* On the front-end, we utilized Sketch to create a wireframe of screen flows and then divided up each screen for development.
* On the back-end, we split the development of each API between Ovie and Peter.
* When specific sections of code were ready, we teamed up in pairs to review the code being merged into 'Master'.
* On the final day, we merged all functionality into the main page.
* Technologies used (and briefly how they work) - Google API, Spotify API, Bootstrap CSS and Javascript framework, Sketch for initial wireframe layout

Rough Breakdown of Tasks:
* Initial screen layout with inputs - begin location and end location
* Container for playlist information and band information, potential 3rd container with map
* Buttons with options for screen views (toggle between map and playlist)
* Setup geolocation from Google Maps
* Pull locations from Google Maps info for input into Spotify
* Generate playlist from Spotify data

Directions for future development: 
* Integrating Trip Advisor
* Integrating Band In Town for local events
* Integrating Weather for each location
* Integrating a swipe functionality into the User Interface and Back button for back-tracking
* Allowing multiple cities to query the playlist
* Create an auto refresh within the Google API if route is changed
