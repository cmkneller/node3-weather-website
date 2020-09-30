const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=724986eabb8dfeb04dbfd4a14d4c8e79&query=${lng},${lat}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to database", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      const weather = body.current;
      const message = `Description: ${weather.weather_descriptions[0]}. it is currently ${weather.temperature} degrees out. it feels like ${weather.feelslike} degrees out`;

      callback(undefined, message);
    }
  });
};

module.exports = forecast;
