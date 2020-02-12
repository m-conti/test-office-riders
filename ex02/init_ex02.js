const fs = require("fs");

const ELEM_TO_ADD = 400;

const cities = [
    'Paris',
    'Caen',
    'Rouen',
    'Lyon',
    'Versailles',
    'Bordeaux',
    'Lille',
    'Avignon'
]

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const randomBetween = (min, max, floor) => {
  const result = min + Math.random() * (max - min);
  return floor ? Math.floor(result) : result;
};

const createNewRandomElem = (id) => {
  const capacity = randomBetween(10, 20, true);
  return {
    _id: id,
    capacity: capacity,
    price: capacity * randomBetween(5, 10, true),
    city: cities[randomBetween(0, 8, true)],
  };
};

const elems = [];

for (let i = 0; i < 2000; i++) {
    elems.push(createNewRandomElem(i));
}

let data = JSON.stringify(elems);
fs.writeFileSync('data.json', data);
