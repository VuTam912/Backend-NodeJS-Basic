import connection from '../configs/connectDB';

let getHomepage = (req, res) => {
	// logic

	// let data = [];
	// simple query
	connection.query('SELECT * FROM `users`', function (err, results, fields) {
		console.log('---check mysql: ');
		let rows = results.map((row) => {
			return row;
		});
		// console.log(results); // results contains rows returned by server
		// console.log(rows);

		return res.render('test/index.ejs', { data: JSON.stringify(rows) });
	});
};

module.exports = {
	getHomepage,
};
