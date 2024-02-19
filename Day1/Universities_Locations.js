//First upload Universities_Locations.csv to Google Earth Engine
//Click on the Assets table above the top left panel
//If you don't see the .csv file, click the refresh button (2 arrows circling each other)
//Hover your mouse over University_Locations, 3 square buttons will appear, click on the right arrow (→)

//The following code will display the points
var points = ee.FeatureCollection(table); //Turns the table into mappable points

Map.addLayer(points, {}, 'CSV Points'); // Shows points on the map

Map.setCenter(57.64, 10.65, 2); //Lat, lon, and zoom
