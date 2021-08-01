const express = require('express');
const app = express();
const neo4j = require('neo4j-driver');
const cors = require('cors');
require('dotenv').config();

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

// Trying to create a node on the graph database

app.post('/add-node', async function (req, res, next) {
	const session = driver.session();

	try {
		const result = await session.run(
			`
	  CREATE (n:User {
		identity: "",
		inLinks: [],
		outLinks: [],
		displayName: "",
		photoURL: "",
		bio: "",
		author:"",
		color:"",
		visibility:"",
		createdOn: "",
		lastEditedOn: ""
	  })
	 `
		);

		await session.close();
		res.end(JSON.stringify(result));
	} catch (error) {
		console.error(error);
	}
});

app.get('/', (req, res, next) => {
	res.send('Server is running.');
});

const driver = neo4j.driver(
	process.env.URL,
	neo4j.auth.basic(process.env.USERNAME, process.env.PASSWORD)
);

const server = app.listen(5000, function () {
	const host = 'localhost';
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
