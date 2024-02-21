// ------Define area & time period of interest--------
// Define a smaller region of interest (ROI) around a specific area 
var smallerROI = ee.Geometry.Rectangle([88.5, 26.5, 92.5, 28.5]); // Bhutan- Adjust coordinates as needed
var smallerROI = ee.Geometry.Rectangle([2.5, 4, 15, 14]); // Nigeria- Adjust coordinates as needed 

// Define the time period for which you want to retrieve the data
var startDate = ee.Date('2050-01-01');
var endDate = ee.Date('2051-01-01'); //day after the last day you want to consider


// ------Set up functions-----------------------------
// A function to retrieve maximum temperature reanalysis data
// Only for the small time and area that you defined above
// Output is in Kelvin
// Various model you can substitue to the .filter(ee.Filter.eq('model', 'ACCESS-CM2'))
//        'ACCESS-CM2', 'ACCESS-ESM1-5', 'BCC-CSM2-MR','CESM2', 
//        'CESM2-WACCM', 'CMCC-CM2-SR5', 'CMCC-ESM2', 'CNRM-CM6-1', 
//        'CNRM-ESM2-1', 'CanESM5', 'EC-Earth3', 'EC-Earth3-Veg-LR', 
//        'FGOALS-g3', 'GFDL-CM4', 'GFDL-ESM4', 'GISS-E2-1-G', 
//        'HadGEM3-GC31-LL', 'HadGEM3-GC31-MM', 'IITM-ESM', 'INM-CM4-8', 
//        'INM-CM5-0', 'IPSL-CM6A-LR', 'KACE-1-0-G', 'KIOST-ESM', 
//        'MIROC-ES2L', 'MIROC6', 'MPI-ESM1-2-HR', 'MPI-ESM1-2-LR', 
//        'MRI-ESM2-0', 'NESM3', 'NorESM2-LM', 'NorESM2-MM', 'TaiESM1', 'UKESM1-0-LL'
var cmip6 = ee.ImageCollection('NASA/GDDP-CMIP6')
  .filterBounds(smallerROI)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.eq('model', 'ACCESS-CM2'))
  .filter(ee.Filter.eq('scenario', 'ssp585')) //'historical'=pre-2015, 'ssp245', 'ssp585'
  .select('tas') //tas = temperture at surface
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
    var hot = image.gt(30); //Change me!!!! 
    return hot.rename('hotdays')
      .set('system:time_start', image.get('system:time_start'));
}

// ------Actual work of calculations, etc. ------------
// Retrieve reanalysis data written as oC
var cmip6_tempMax_oC = cmip6.map(Kelvin_to_Celsius);
//Map.addLayer(era5_tempMax_oC)


var hot_tf = cmip6_tempMax_oC.map(hotdays);
var hot_count_annual = hot_tf.reduce('sum');
//Map.addLayer(hot_count_annual);

var hot_count_annual_categories = ee.Image(0)
    //1-5 is just a count of the discrete categories I am making, it matches my 5 colors
    // for the months break down I used 365÷12=30.4 for ease
    .where(hot_count_annual.eq(0), 1) // Not expected
    .where(hot_count_annual.gt(0), 2) // <3 month
    .where(hot_count_annual.gte(91.2), 3) // 3+ months
    .where(hot_count_annual.gte(182.4), 4)// 6+ months
    .where(hot_count_annual.gte(273.6), 5) // 9+ months
    .updateMask(hot_count_annual.neq(0));


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
