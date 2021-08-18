const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

app.use(require('./routes'));

module.exports = app;
