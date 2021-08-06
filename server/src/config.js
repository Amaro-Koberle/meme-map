module.exports = {
	secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',

	rounds:
		process.env.NODE_ENV === 'production' ? parseInt(process.env.ROUNDS) : 10,

	neo4j: {
		url: process.env.URL || 'neo4j://localhost:7687',
		username: process.env.URL || 'neo4j',
		password: process.env.URL || 'neo4j',
		database: 'neo4j',
	},
};
