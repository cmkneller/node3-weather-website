const path = require("path");

const express = require("express");

const hbs = require("hbs");
const { send } = require("process");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config

const publicDirectory = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// setup handlbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectory));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please prov ide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   address: req.query.address,
  //   forecast: "a bit chilly",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    message: "i need help pls",
    title: "Help",
    name: "Chris Kneller",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Bum Smith" });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "chris Kneller",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 (help page)",
    message: "help article not found",
    name: "chris",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: " sorry page not found",
    name: "chris",
  });
});

app.listen(port, () => {
  console.log("server is up on port 3000." + port);
});

// app.com
// app.com/help
// app.com/about
//
