//----------------------REGIONAL MAP SECTION: Start---------------------------------------
//This section of code is to prepare your map so you are looking at your country
//This was written for Bhutan but can be adjusted for your country of interest 
//If you are in a large country, you may want to look at the Regional Map code RegionalMap.js

// Move map so not centered on the US
Map.setCenter(7.842, 10.772, 5); // Adjust coordinates as needed

//Border outlined in black
var CountryOfInterest = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1').filter('ADM0_NAME=="Nigeria"');
var styleParams = {
  fillColor:'#FFFFFF00', //This makes the inside of the country white (FFFFFF) and clear (00)
  color: "black", //Black border. If you can't see the black over a dark color, try "grey"
  width:1.0, //Border thickness
};
var CountryBorder=CountryOfInterest.style(styleParams); //Apply the style to the selected country

Map.addLayer(CountryBorder,{},'Border'); //MOVE ME!!! I am the last line of ALL your code
//----------------------REGIONAL MAP SECTION: End---------------------------------------
