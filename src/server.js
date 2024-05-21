const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'build')));

const cities = [
    { name: 'Yapkashnagar', distance: 60 },
    { name: 'Lihaspur', distance: 50 },
    { name: 'Narmis City', distance: 40 },
    { name: 'Shekharvati', distance: 30 },
    { name: 'Nuravgram', distance: 20 },
];

const vehiclesarr = [
    { name: 'EV Bike', range: 60, count: 2 },
    { name: 'EV Car', range: 100, count: 1 },
    { name: 'EV SUV', range: 120, count: 1 },
];

let copsSelections = [];
let fugitiveCity = '';



function selectFugitiveCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
        fugitiveCity = cities[0].name;
    // fugitiveCity = cities[randomIndex].name;
}

selectFugitiveCity();

app.get('/cities', (req, res) => {
    res.json(cities);
});

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

app.post('/vehicles',(req,res)=>{
    console.log(req.body);
    res.json(vehicles);
})

app.post('/api/start-simulation', (req, res) => {

    console.log('app/simulation line 52',req.body)
    console.log('app/simulation line 53',req.body.vehicles)

    const { vehicles } = req.body;
    console.log('vehicle posted',vehicles)
    const { cop1, cop2 } = vehicles;

    copsSelections = []; // Reset selections

    // Find the selected vehicles
    const selectedVehicleCop1 = vehiclesarr.find(v => v.name === cop1);
    const selectedVehicleCop2 = vehiclesarr.find(v => v.name === cop2);

    console.log('selectedVehicleCop1',selectedVehicleCop1)
    console.log('selectedVehicleCop1',selectedVehicleCop2)
    if (!selectedVehicleCop1 || !selectedVehicleCop2) {
        return res.status(400).json({ error: 'Invalid vehicle selection' });
    }
    //===========
    const availableCities = [...cities]; // Clone cities array

    // Randomly assign a city to each cop from the available cities
    const cityForCop1 = availableCities.splice(Math.floor(Math.random() * availableCities.length), 1)[0];
    const cityForCop2 = availableCities.splice(Math.floor(Math.random() * availableCities.length), 1)[0];

    //=========

    copsSelections.push({ copName: 'Cop1',cityName: cityForCop1.name, vehicleName: cop1 });
    copsSelections.push({ copName: 'Cop2',cityName: cityForCop2.name, vehicleName: cop2 });

    //need to make post api for geting vehicles details and add them into vehiclearr;
    // copsSelections.push({ copName: 'Vehicle', vehicleName: vehicles});
    // copsSelections.push({ copName: 'Vehicle', vehicleName: vehicles});
    
    console.log("copsSelections : ",copsSelections)
    console.log('fugitiveCity: ', fugitiveCity);

    const capturingCop = copsSelections.find(selection => selection.cityName === fugitiveCity);
    console.log('capturingCop :',capturingCop)

    const capturingCity = cities.find(city => city.name === fugitiveCity);
    console.log(' capturingCity:',capturingCity)
    if (capturingCity && capturingCop) {
        res.json({ success: true, capturingCop: capturingCop.copName, cities : capturingCity });
       
    } else {
        res.json({ success: false });
    }
    // res.json(true);
});

app.get('/result', (req, res) => {
    console.log("copsSelections line 93",copsSelections)

    const capturingCop = copsSelections.find(selection => selection.cityName === fugitiveCity);

    if (capturingCop) {
        res.json({ success: true, capturingCop: capturingCop.copName });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
