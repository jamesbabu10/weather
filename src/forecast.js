const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e7c82f3fbd4252f90af3f840de114bab&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (err, res) => {
    if (err) callback("Unable to connect to weather service!", undefined);
    else if (res.body.error) callback("Unable to find the location", undefined);
    else {
      data = res.body;
      callback(
        undefined,
        `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. There is a ${data.current.precip} chance of rain.`
      );
    }
  });
};

module.exports = forecast;
