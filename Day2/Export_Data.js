// Export the image to an Google Drive.
function rasterExport(layer, name) {
  Export.image.toDrive({
    image: layer,
    description: 'SingleRasterToDrive',
    fileNamePrefix: name,
    region: ee.Geometry.BBox(88.5, 26.5, 92.5, 28.5), //Change to match your region!!!
    crs: 'EPSG:4326',
  });
} 

//rasterExport(hot_count_annual,"discriptive_file_name")

// Save the image to an Earth Engine asset.
function rasterSaveEE(layer, name) {
  Export.image.toAsset({
    image: layer,
    description: 'SingleRasterToAsset',
    assetId: name, 
    region: ee.Geometry.BBox(88.5, 26.5, 92.5, 28.5), //Change to match your region!!!
    crs: 'EPSG:4326',
    pyramidingPolicy: {
      'b4_mean': 'mean',
      'b4_sample': 'sample',
      'b4_max': 'max'
    }
  });
}

//rasterSaveEE(hot_count_annual,"discriptive_file_name")
