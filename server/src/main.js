// In order to start mongoDB, run:
// cd /Users/amaro/mongodb/bin/
// and then:
// mongod --dbpath /Users/amaro/mongodb-data

const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(process.env.PORT || 5000, () =>
			console.log('Listening on port ' + 5000)
		)
	)
	.catch((err) => console.log(err.message));
