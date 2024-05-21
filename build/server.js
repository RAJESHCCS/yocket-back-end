"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'build')));

var cities = [{
  name: 'Yapkashnagar',
  distance: 60
}, {
  name: 'Lihaspur',
  distance: 50
}, {
  name: 'Narmis City',
  distance: 40
}, {
  name: 'Shekharvati',
  distance: 30
}, {
  name: 'Nuravgram',
  distance: 20
}];
var vehiclesarr = [{
  name: 'EV Bike',
  range: 60,
  count: 2
}, {
  name: 'EV Car',
  range: 100,
  count: 1
}, {
  name: 'EV SUV',
  range: 120,
  count: 1
}];
var copsSelections = [];
var fugitiveCity = '';
function selectFugitiveCity() {
  var randomIndex = Math.floor(Math.random() * cities.length);
  fugitiveCity = cities[0].name;
  // fugitiveCity = cities[randomIndex].name;
}
selectFugitiveCity();
app.get('/cities', function (req, res) {
  res.json(cities);
});
app.get('/vehicles', function (req, res) {
  res.json(vehicles);
});
app.post('/vehicles', function (req, res) {
  console.log(req.body);
  res.json(vehicles);
});
app.post('/api/start-simulation', function (req, res) {
  console.log('app/simulation line 52', req.body);
  console.log('app/simulation line 53', req.body.vehicles);
  var vehicles = req.body.vehicles;
  console.log('vehicle posted', vehicles);
  var cop1 = vehicles.cop1,
    cop2 = vehicles.cop2;
  copsSelections = []; // Reset selections

  // Find the selected vehicles
  var selectedVehicleCop1 = vehiclesarr.find(function (v) {
    return v.name === cop1;
  });
  var selectedVehicleCop2 = vehiclesarr.find(function (v) {
    return v.name === cop2;
  });
  console.log('selectedVehicleCop1', selectedVehicleCop1);
  console.log('selectedVehicleCop1', selectedVehicleCop2);
  if (!selectedVehicleCop1 || !selectedVehicleCop2) {
    return res.status(400).json({
      error: 'Invalid vehicle selection'
    });
  }
  //===========
  var availableCities = [].concat(cities); // Clone cities array

  // Randomly assign a city to each cop from the available cities
  var cityForCop1 = availableCities.splice(Math.floor(Math.random() * availableCities.length), 1)[0];
  var cityForCop2 = availableCities.splice(Math.floor(Math.random() * availableCities.length), 1)[0];

  //=========

  copsSelections.push({
    copName: 'Cop1',
    cityName: cityForCop1.name,
    vehicleName: cop1
  });
  copsSelections.push({
    copName: 'Cop2',
    cityName: cityForCop2.name,
    vehicleName: cop2
  });

  //need to make post api for geting vehicles details and add them into vehiclearr;
  // copsSelections.push({ copName: 'Vehicle', vehicleName: vehicles});
  // copsSelections.push({ copName: 'Vehicle', vehicleName: vehicles});

  console.log("copsSelections : ", copsSelections);
  console.log('fugitiveCity: ', fugitiveCity);
  var capturingCop = copsSelections.find(function (selection) {
    return selection.cityName === fugitiveCity;
  });
  console.log('capturingCop :', capturingCop);
  var capturingCity = cities.find(function (city) {
    return city.name === fugitiveCity;
  });
  console.log(' capturingCity:', capturingCity);
  if (capturingCity && capturingCop) {
    res.json({
      success: true,
      capturingCop: capturingCop.copName,
      cities: capturingCity
    });
  } else {
    res.json({
      success: false
    });
  }
  // res.json(true);
});
app.get('/result', function (req, res) {
  console.log("copsSelections line 93", copsSelections);
  var capturingCop = copsSelections.find(function (selection) {
    return selection.cityName === fugitiveCity;
  });
  if (capturingCop) {
    res.json({
      success: true,
      capturingCop: capturingCop.copName
    });
  } else {
    res.json({
      success: false
    });
  }
});
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});