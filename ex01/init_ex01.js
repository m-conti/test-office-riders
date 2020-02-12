const mongodb = require("mongodb");

const dburl = "mongodb://localhost";
const dbName = "test";

const CLIENT_NUMBER = 36;
const ELEM_TO_ADD = 400;

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomBetween = (min, max, floor) => {
  const result = min + Math.random() * (max - min);
  return floor ? Math.floor(result) : result;
};

mongodb
  .connect(dburl)
  .then(async client => {
    const db = client.db(dbName);
    
    const data = [];
    
    const to_add = process.argv[2] ? parseInt(process.argv[2]) : ELEM_TO_ADD;

    console.log(`Number of random item in DB : ${to_add}`);

    for (let i = 0; i < to_add; i++) {
      const created_at = randomDate(new Date(2018, 01, 01), new Date(2020, 30, 01));
      const paid_at = randomDate(created_at, new Date(2020, 20, 02));
      const client = {
        client_id: i % CLIENT_NUMBER,
        qty: randomBetween(1, 50, true),
        price: randomBetween(1, 20, false),
        tva: randomBetween(10, 20, false),
        created_at: created_at.toDateString(),
        paid_at: paid_at
    };
      data.push(client);
    }

    await db.collection("orders").remove();
    await db.collection("orders").insertMany(data);

    console.log(`DB DONE!`);

    client.close();
  })
  .catch(e => console.error(e));
