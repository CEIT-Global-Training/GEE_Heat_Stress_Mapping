// ------Define area & time period of interest--------
// Define a smaller region of interest (ROI) around a specific area in Bhutan
var smallerROI = ee.Geometry.Rectangle([88.5, 26.5, 92.5, 28.5]); // Adjust coordinates as needed

// Define the time period for which you want to retrieve the data
var startDate = ee.Date('2020-01-01');
var endDate = ee.Date('2020-01-02'); //day after the last day you want to consider

// ------Set up functions-----------------------------
// A function to retrieve 3 elements from ERA5
//These will be store as 3 "bands"
var era5 = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .filterBounds(smallerROI)
  .filterDate(startDate, endDate)
  .select('u_component_of_wind_10m','v_component_of_wind_10m','surface_solar_radiation_downwards_hourly')
  .map(function(image) {
    // Clip each image to the smaller ROI
    var clipped_Variables = image.clip(smallerROI);
    return clipped_Variables;
  });

print(era5);

//----------Combine Bands ----------------------------- 
// Define a function to multiply two bands of an image
var multiplyBands = function(image) {
  // Multiply the two bands using the expression function
  var multiplied = image.expression(
    "(band1)*(band2)", // Expression to multiply the bands
    {
      'band1': image.select('u_component_of_wind_10m'), // Select the first band
      'band2': image.select('v_component_of_wind_10m')  // Select the second band
    }
  ).rename('result_band'); // Rename the resulting band
  
  // Return the image with the multiplied band added
  return image.addBands(multiplied);
};

// Apply the function to each image in the image collection
var multipliedCollection = era5.map(multiplyBands);

// Print the multiplied collection
print(multipliedCollection);

// Add data to map
Map.addLayer(multipliedCollection, {},'Test');
