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

// note: config: convert JSON to objects in server.js
let createNewUser = async (req, res) => {
	let { firstname, lastname, email, address } = req.body;

	await connectionPool.execute(
		`INSERT INTO users (firstname,lastname,email,address) VALUES (?, ?, ?, ?)`,
		[firstname, lastname, email, address]
	);
	// quay lai/ chuyen huong (redirect)
	res.redirect('/');
};

module.exports = {
	getHomepage,
	getDetailPage,
	createNewUser,
};
