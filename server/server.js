const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const data = require("./data.json");

const numberOfPages = (perPage) => {
  return Math.ceil(data.length / perPage);
};

const paginationData = (perPage, pageNumber) => {
  const numberOfResults = data.length;
  const arr = [];
  for (let loop = 0; loop < numberOfResults; loop += perPage) {
    arr.push(data.slice(loop, loop + perPage));
  }
  return arr[pageNumber - 1];
};

app.get("/api/todos", (req, res) => {
  const perPage = Number(req?.query.numberPerPage);
  const pageNumber = Number(req?.query.pageNumber);
  const dataToReturn = paginationData(perPage, pageNumber);
  res.send(dataToReturn);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
