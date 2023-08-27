var cache = require("memory-cache");
const express = require("express");

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const data = require("./data.json");

const numberOfPages = (perPage) => {
  return Math.ceil(data.length / perPage);
};

const paginationData = (perPage, pageNumber, typeOfResults) => {
  let newData = [...data];
  if (typeOfResults !== "all") {
    newData = data.filter((current) => current.type === typeOfResults);
  }
  const numberOfResults = newData.length;
  const arr = [];
  for (let loop = 0; loop < numberOfResults; loop += perPage) {
    arr.push(newData.slice(loop, loop + perPage));
  }

  // Save data to cache
  cache.put(
    `data-page-${pageNumber}-${typeOfResults}`,
    arr[pageNumber - 1],
    60000
  );
  return arr[pageNumber - 1];
};

app.get("/api/todos", (req, res) => {
  const perPage = Number(req?.query?.numberPerPage);
  const pageNumber = Number(req?.query?.pageNumber);
  const typeOfResults = req?.query?.typeOfResults;
  const fastSearch = req?.query?.fastSearch;

  if (req.query.hasOwnProperty("fastSearch")) {
    fastSearchFunction(fastSearch, res);
  } else {
    const cachedData = cache.get(`data-page-${pageNumber}-${typeOfResults}`);
    // If the data in cache return from chach

    if (cachedData) {
      console.log(`Return data from cache `);
      res.send(cachedData);
    } else {
      const dataToReturn = paginationData(perPage, pageNumber, typeOfResults);
      res.send(dataToReturn);
    }
  }
});

app.post("/api/todos/update", (req, res) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    if (data && id && status) {
      data.map((current) => {
        if (current.id === id) {
          console.log(`id:::: ${id} change status to ${status} in the server`);
          current.status = status;
        }
      });
    }
    res.send("done");
  } catch (error) {
    console.log(`Error:::${error}`);
    res.send("error");
  }
});

const fastSearchFunction = (word, res) => {
  try {
    const fastSearchResults = [...data];
    const arrayToReturn = fastSearchResults.filter((current) => {
      if (
        current.title.indexOf(word) !== -1 ||
        current.content.indexOf(word) !== -1
      ) {
        return current;
      }
    });

    res.send(arrayToReturn);
  } catch (error) {
    console.log(`Error:::${error}`);
    res.send(error);
  }
};

app.listen(port, () => console.log(`Listening on port ${port}`));
