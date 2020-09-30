const request = require("Request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2tuZWxsZXIiLCJhIjoiY2tlcTF2ZW8wMXgzbzJ2azd5azZrbWkwNCJ9.MO56gJCBeKmts6IqQXZxJg&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to conect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback(
        "unable to find location, find another search",
        undefined
      );
    } else {
      const {
        center: coords,
        place_name: place,
      } = response.body.features[0];

      callback(undefined, {
        latitude: coords[0],
        longitude: coords[1],
        location: place,
      });
    }
  });
};

module.exports = geocode;
