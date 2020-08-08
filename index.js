/* eslint-env node */

const express = require('express');
const app = express();
const port = 8001;

app.use(express.static("app"));

app.all('*', (req, res) => {
    res.status(404).json({status: "404", message: "Noooooo, you broke our API. What did you do?"});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});