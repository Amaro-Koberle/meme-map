// importing packages
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.efrud.mongodb.net/${process.env.MONGODB_DEFAULT_DATABASE}`;

// allowing cross origin requests from any origin (CORS policy)
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// parsing request bodies
app.use(bodyParser.json()); // application/json

// importing routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// routing
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// error handling
app.use((err, req, res, next) => {
	console.log(err);
	const status = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	const data = err.data;
	//res.status(status).json({ message: message, data: data });
});

// connecting to database and starting server
mongoose
	.connect(MONGODB_URI)
	.then((result) => {
		app.listen(PORT || 5000, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
