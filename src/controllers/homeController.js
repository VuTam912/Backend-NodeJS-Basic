import connection from '../configs/connectDB';

let getHomepage = (req, res) => {
	// logic

	let data = [];
	// simple query
	connection.query('SELECT * FROM `users`', function (err, results, fields) {
		let rows = results.map((row) => {
			data.push({
				id: row.id,
				firstname: row.firstname,
				lastname: row.lastname,
				email: row.email,
				address: row.address,
			});
		});
		// console.log(results); // results contains rows returned by server
		console.log(data);

		return res.render('index.ejs', { dataUser: data, test: 'test...' });
	});
};

module.exports = {
	getHomepage,
};
