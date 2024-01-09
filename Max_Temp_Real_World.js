// ------Define area & time period of interest--------
// Define a smaller region of interest (ROI) around a specific area in Bhutan
var smallerROI = ee.Geometry.Rectangle([88.5, 26.5, 92.5, 28.5]); // Adjust coordinates as needed

// Define the time period for which you want to retrieve the data
var startDate = ee.Date('1981-01-01');
var endDate = ee.Date('1990-01-01'); //day after the last day you want to consider


// ------Set up functions-----------------------------
// A function to retrive maximum temperature reanlysis data
// Only for the small time and area that you defined above
// Output is in Kelvin
var era5 = ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR')
  .filterBounds(smallerROI)
  .filterDate(startDate, endDate)
  .select('temperature_2m_max')
  .map(function(image) {
    // Clip each image to the smaller ROI
    var clipped_Variables = image.clip(smallerROI);
    return clipped_Variables;
  });

// A function to cover Kelvin to Celcius
var Kelvin_to_Celsius = function(image) {
  var temperture_in_Celsius = image.subtract(273.15);
  return temperture_in_Celsius;
};


// ------Actual work of calculations, etc. ------------
// Retrieve reanalysis data written as oC
var era5_tempMax_oC = era5.map(Kelvin_to_Celsius);


// ------Map data---------------------------------------
// Move map so not centered on the US
Map.setCenter(88.5, 26.5, 6.0); //Lat, lon, zoom level

// Create a color pallete
var vis2mt_oC = {
  min: -25,
  max: 60,
  palette: [
    'fff4b0', 'ff931f', 'ec3f13', 'a50104', '7a0103' //tan to dark red
  ]
};

// Add data to map
Map.addLayer(
    era5_tempMax_oC, vis2mt_oC,
    'Daily max 2m air temperature (oC)');
