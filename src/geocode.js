const request = require("request");
const geocode = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiamFtZXNkYXNkYXNkIiwiYSI6ImNsM3F6d3F1aDFjNzMzaW9ldWswa2ZvY2sifQ.XVGhZ4GiXkJbyUO9EjAXSQ&limit=1`;
  request({ url, json: true }, (err, res) => {
    if (err) callback("Unable to connect to location services", undefined);
    else if (res.body.features.length == 0)
      callback("Unable to find location.Try another search", undefined);
    else {
      const latitude = res.body.features[0].center[1];
      const longitude = res.body.features[0].center[0];
      const location = res.body.features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
