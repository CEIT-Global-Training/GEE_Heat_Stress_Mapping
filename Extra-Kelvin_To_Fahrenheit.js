//------KELVIN TO FAHRENHEIT FUNCTION: Start------------------------ 
//In all the code in this workshop, we go from Kelvin to Celsius with the function Kelvin_to_Celsius
//If you are working with the US or Liberia or a few small island nations, you might want to use it for more impactful communications
//Just make sure you not only replace the function but anywhere else in the code that says Kelvin_to_Celsius with Kelvin_to_Celsius

var Kelvin_to_Fahrenheit = function(image) {
  var temperture_in_Celsius = image.subtract(273.15);
  var temperture_intermediate_calculation = temperture_in_Celsius.multiply(1.8);
  var temperture_in_Fahrenheit = temperture_intermediate_calculation.add(32);
  return temperture_in_Fahrenheit;
};

//------KELVIN TO FAHRENHEIT FUNCTION: End------------------------ 
