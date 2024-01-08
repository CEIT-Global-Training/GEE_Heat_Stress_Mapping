//----------------------COUNTRY MAP SECTION: Start---------------------------------------
//This section of code is to prepare your map so you are looking at your country
//This was written for Bhutan but can be adjusted for your country of interest 
//If you are in a large country, you may want to look at the Regional Map code RegionalMap.js

// Define a smaller region of interest (ROI) around a specific area in Bhutan
var smallerROI = ee.Geometry.Rectangle([88.5, 26.5, 92.5, 28.5]); // Adjust coordinates as needed

Map.setCenter(88.5, 26.5, 6.0); // Adjust coordinates as needed

//Border outlined in Black
var CountryOfInterest = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter('country_na=="Bhutan"');
var styleParams = {
  fillColor:'#FFFFFF00', //This makes the inside of the country white (FFFFFF) and clear (00)
  color: "black", //Black border
  width:1.0, //Border thickness
};
var CountryBorder=CountryOfInterest.style(styleParams); //Apply the style to the selected country

Map.addLayer(CountryBorder,{},'Border'); //MOVE ME!!! I am the last line of ALL your code
//----------------------COUNTRY MAP SECTION: End---------------------------------------
