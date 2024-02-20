//Change the name of the imported data from table to polygon
var shapes = ee.FeatureCollection(polygon); //Turns the table into mappable points

Map.addLayer(shapes, {}, 'Uploaded Shapefile'); // Shows points on the map


//------------Things to add to the {} in line 4---------------------------------------------------

//{
//  fillColor:'#FFFFFF00', //This makes the inside of the country white (FFFFFF) and clear (00)
//  color: "black", //Black border. If you can't see the black over a dark color, try "grey"
//  width:1.0, //Border thickness
//};


//{color: "grey"}
