// Je n'ai pas trouvé pour afficher les nouveaux clients avec une seule requête.
// l' _id est le numero du mois
// j'ai pris la date de creation du panier comme date de tri.

const mongodb = require("mongodb");

const dburl = "mongodb://localhost";
const dbName = "test";

mongodb
  .connect(dburl)
  .then(client => {
    const db = client.db(dbName);

    const curs = db.collection("orders").aggregate([
      {
        $project: {
          month: {
            $month: {
              $dateFromString: {
                dateString: "$created_at",
                timezone: "Europe/Paris"
              }
            }
          },
          total_price: { $multiply: ["$price", "$qty"] },
          total_tva: {
            $multiply: ["$price", "$qty", { $divide: ["$tva", 100] }]
          },
          waiting_time: {
            $divide: [
              {
                $subtract: [
                  "$paid_at",
                  {
                    $dateFromString: {
                      dateString: "$created_at",
                      timezone: "Europe/Paris"
                    }
                  }
                ]
              },
              60000
            ]
          },
        }
      },
      {
        $group: {
          _id: "$month",
          total_orders: { $sum: 1 },
          ca: { $sum: "$total_price" },
          tva: { $sum: "$total_tva" },
          waiting_time: { $sum: "$waiting_time" },
        }
      },
      {
        $project: {
          _id: 1,
          total_orders: 1,
          ca: 1,
          tva: 1,
          average_basket: { $divide: ["$ca", "$total_orders"] },
          standard_deviation: { $divide: ["$waiting_time", "$total_orders"] }
        }
      }
    ]);

    curs.forEach(item => console.log(item));
    client.close();
  })
  .catch(e => console.error(e));
