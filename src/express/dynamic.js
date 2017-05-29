const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3418;
const root = process.argv[2];

// Main server object.
let app = express();

// Handle all requests.
app.use((req, res, next) => {
  const actual = path.join(root, req.url);
  if (actual.endsWith('.js')) {
    const libName = './'.concat(actual.slice(0, -3));
    dynamic = require(libName);
    const data = dynamic.page();
    res.status(200).send(data);
  }
  else {
    const data = fs.readFileSync(actual, 'utf-8');
    res.status(200).send(data);
  }
});

app.listen(PORT, () => {console.log('listening...');});
