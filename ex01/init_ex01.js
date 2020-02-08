const mongodb = require("mongodb");

const dburl = "mongodb://localhost";
const dbName = "test";

mongodb
  .connect(dburl)
  .then(client => {
    console.log("OK!");
    const db = client.db(dbName);

    db.collection("orders").insertMany([
        { client_id: "10", qty: 50, price: 4.25, tva: 20, created_at: "Jan 03 2020 01:00:00", paid_at: new Date("2020-01-25T23:00:00.000+00:00") }
    ]);

    client.close();
  })
  .catch(e => console.error(e));
