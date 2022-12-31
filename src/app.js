const geocode = require("./geocode");
const forecast = require("./forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "James Babu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "James Babu",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "For any help contact ",
    link: "https://www.linkedin.com/in/james-babu/",
    title: "Help",
    name: "James Babu",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an adress" });
  }
  const address = req.query.address;

  if (!address) {
    console.log("Please provide an address");
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({ location, forecastData });
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [req.query.search],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "James Babu",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "James Babu",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
