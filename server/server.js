const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const data = require('./data.json');

app.get('/api/todos', (req, res) => {
  res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));