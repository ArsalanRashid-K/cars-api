const express = require("express");
const app = express();

const cars = [
  {
    id: 1,
    brand: "Toyota",
    price: 20000,
    horsepower: 200,
  },
  {
    id: 2,
    brand: "Ford",
    price: 25000,
    horsepower: 250,
  },
  {
    id: 3,
    brand: "Honda",
    price: 18000,
    horsepower: 180,
  },
];

app.get("/cars", (req, res) => {
  res.json(cars);
});

app.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  const fields = req.query.fields; // get the fields query parameter

  const car = cars.find((car) => car.id === parseInt(id));

  // check if the car exists
  if (!car) {
    res.status(404).send("Car not found");
    return;
  }

  // check if fields are specified and return only those fields
  if (fields) {
    const filteredCar = {};

    fields.split(",").forEach((field) => {
      if (car.hasOwnProperty(field)) {
        filteredCar[field] = car[field];
      }
    });

    res.send(filteredCar);
  } else {
    res.send(car);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
