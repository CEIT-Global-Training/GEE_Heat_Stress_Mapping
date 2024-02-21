// ------Define area & time period of interest--------
// Define a smaller region of interest (ROI) around a specific area in Bhutan
var smallerROI = ee.Geometry.Rectangle([88.5, 26.5, 92.5, 28.5]); // Adjust coordinates as needed

// Define the time period for which you want to retrieve the data
var startDate = ee.Date('1981-01-01');
var endDate = ee.Date('1990-01-01'); //day after the last day you want to consider


// ------Set up functions-----------------------------
// A function to retrieve maximum temperature reanalysis data
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

// function to get hot days
function hotdays(image){
    var hot = image.gte(18); //Change me!!!! 
    return hot.rename('hotdays')
      .set('system:time_start', image.get('system:time_start'));
}

// ------Actual work of calculations, etc. ------------
// Retrieve reanalysis data written as oC
var era5_tempMax_oC = era5.map(Kelvin_to_Celsius);

var hot_tf = era5_tempMax_oC.map(hotdays);
var hot_count = hot_tf.reduce('sum');
var hot_count_annual = hot_count.divide(10); //Replace 10 with the number of years considered

var hot_count_annual_categories = ee.Image(0)
    //1-5 is just a count of the discrete categories I am making, it matches my 5 colors
    // for the months break down I used 365÷12=30.4 for ease
    .where(hot_count_annual.eq(0), 1) // Not expected
    .where(hot_count_annual.gt(0), 2) // <1 month
    .where(hot_count_annual.gte(91.2), 3) // 3+ months
    .where(hot_count_annual.gte(182.4), 4)// 6+ months
    .where(hot_count_annual.gte(273.6), 5) // 9+ months
    .updateMask(hot_count_annual.neq(0))


// ------Map data---------------------------------------
// Move map so not centered on the US
Map.setCenter(88.5, 26.5, 6.0); //Lat, lon, zoom level

//Create new color palettes
// Temperature Count, 5 colors
var visTempCount = {
  min: 0,
  max: 365.25,
  palette: [
    '#FFFFFF00','#FFEAAA', '#FFBA08', '#D00000', '#6A040F'
  ]
};

var visTempCount_categories = {
  min: 1,
  max: 5,
  palette: [
    '#FFFFFF00','#FFEAAA', '#FFBA08', '#D00000', '#6A040F'
  ]
};

// Add data to map
Map.addLayer(hot_count_annual_categories, visTempCount_categories,
     'Number of Hot Days- Categories');
