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
	return res.redirect('/');
};

// delete - su dung input da set value <% datauser.id %> de delete voi id thay vi dung params cua router
// áp dụng cho chuẩn restful
let deleteUser = async (req, res) => {
	let userId = req.body.userId;
	console.log(userId);
	await connectionPool.execute('DELETE FROM users WHERE id = ?', [userId]);
	return res.redirect('/');
	// res.send('delete success');
};

// edit User
let getEditPage = async (req, res) => {
	let id = req.params.id;
	let [user] = await connectionPool.execute(
		'SELECT * FROM users WHERE id = ?',
		[id]
	);
	// check if data is empty or not
	let results = user && user.length > 0 ? user[0] : {};
	return res.render('update.ejs', { dataUser: results }); // x <- y
};

// update User -
let postUpdateUser = async (req, res) => {
	// id => su dung input hidden - theo chuẩn restful
	let { firstname, lastname, email, address, userId } = req.body;

	await connectionPool.execute(
		`UPDATE users SET firstname = ?, lastname=?,email=?, address=?  WHERE id = ? `,
		[firstname, lastname, email, address, userId]
	);
	return res.redirect('/');
};

module.exports = {
	getHomepage,
	getDetailPage,
	createNewUser,
	deleteUser,
	getEditPage,
	postUpdateUser,
};
