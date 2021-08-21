const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.use((err, req, res, next) => {
    res.status(err.status || err.statusCode || 500).json(err);
})

module.exports = app;
