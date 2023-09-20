// API <-> get Database from server
// su dung postman de thao tach CRUD API
import connectionPool from '../configs/connectDB';

let getAllUsers = async (req, res) => {
	// http status 404, 501
	// json/xml => object

	const [rows, fields] = await connectionPool.execute('SELECT * FROM users');

	return res.status(200).json({
		message: 'ok',
		data: rows,
	});
};

// CREATE NEW USER
let createNewUser = async (req, res) => {
	let { firstname, lastname, email, address } = req.body;

	if (!firstname || !lastname || !email || !address) {
		return res.status(200).json({
			message: 'missing requried params',
		});
	}
	await connectionPool.execute(
		`INSERT INTO users (firstname,lastname,email,address) VALUES (?, ?, ?, ?)`,
		[firstname, lastname, email, address]
	);

	return res.status(200).json({
		message: 'ok',
	});
};

// UPDATE USER - not use id params
let updateUser = async (req, res) => {
	let { firstname, lastname, email, address, id } = req.body;

	if (!firstname || !lastname || !email || !address) {
		return res.status(200).json({
			message: 'missing requried params',
		});
	}

	await connectionPool.execute(
		`UPDATE users SET firstname = ?, lastname=?,email=?, address=?  WHERE id = ? `,
		[firstname, lastname, email, address, id]
	);

	return res.status(200).json({
		message: 'ok update',
	});
};

// DELETE USER - use id params
let deleteUser = async (req, res) => {
	let userId = req.params.id;

	// nếu ko truyền id
	if (!userId) {
		return res.status(200).json({
			message: 'missing requried params',
		});
	}

	await connectionPool.execute('DELETE FROM users WHERE id = ?', [userId]);

	return res.status(200).json({
		message: 'ok update',
	});
};

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
};
