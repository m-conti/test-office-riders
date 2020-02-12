const data = require("./data.json");

const _ = require("lodash");
const fs = require("fs");

const CHAR_VAL = 0x7fff;
const MAX_LENGTH_FIELD = 20;

const sorter = [
  { order: "asc", field: "city" },
  { order: "desc", field: "capacity" },
  { order: "asc", field: "price" }
];

// Le but est de créer un field qui va être une combinaison des fields demandé
// /!\ lodash orderBy peux faire ce tri mais dans le but de l'excercice j'ai créé ce field pour qu'il sert de reference
// CHAR_VAL sert quand on veut faire un ordre décroissant, on applique donc ce mask au field afin d'inverser la valeur

const makeValue = (value, mask) => {
  let resp = "";
  for (let i = 0; i < MAX_LENGTH_FIELD; ++i) {
    resp += String.fromCharCode(mask ^ value.charCodeAt(i));
  }
  return resp;
};

const addToSortField = (sortOpt, data) => {
  const orderMask = sortOpt.order === "asc" ? CHAR_VAL : 0;
  const value =
    typeof data[sortOpt.field] === "string"
      ? data[sortOpt.field].padEnd(MAX_LENGTH_FIELD, "0")
      : data[sortOpt.field].toString().padStart(MAX_LENGTH_FIELD, "0");
  if (!data.sortField) data.sortField = "";
  data.sortField += makeValue(value, orderMask);
};

const sortDataByFields = sorter => {
  for (let i = 0; i < sorter.length; ++i) {
    for (let j = 0; j < data.length; ++j) {
      addToSortField(sorter[i], data[j]);
    }
  }
};

sortDataByFields(sorter);

const mySort = data.sort((a, b) => a.sortField < b.sortField ? 1 : -1).map(sorted => _.omit(sorted, ["sortField"]));

fs.writeFileSync(
  "data-sort.json",
  JSON.stringify(mySort)
);
