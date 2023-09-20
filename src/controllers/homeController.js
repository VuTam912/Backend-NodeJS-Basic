import connectionPool from '../configs/connectDB';

let getHomepage = async (req, res) => {
	// logic
	const [rows, fields] = await connectionPool.execute('SELECT * FROM `users`');

	return res.render('index.ejs', { dataUser: rows, test: 'test...' });
};

let getDetailPage = async (req, res) => {
	//  req.params.userId => get params id
	let userId = req.params.id;
	// [] => arrays
	let [user] = await connectionPool.execute(
		'SELECT * FROM `users` WHERE `id` = ?',
		[userId]
	);
	return res.send(JSON.stringify(user));
};

module.exports = {
	getHomepage,
	getDetailPage,
};
