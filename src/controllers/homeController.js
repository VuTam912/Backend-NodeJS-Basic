import connectionPool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

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

// ---------------------------------

// router Upload FIle Page
let getUploadFilePage = (req, res) => {
	return res.render('uploadFile.ejs');
};

// =========== Upload file ==================

// thông tin để upload file :
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// console.log('--check Approot: ', appRoot);
		cb(null, appRoot + '/src/public/image/');
	},

	// By default, multer removes file extensions so let's add them back
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

// lọc đuôi file
const imageFilter = function (req, file, cb) {
	// Accept images only
	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
		req.fileValidationError = 'Only image files are allowed!';
		return cb(new Error('Only image files are allowed!'), false);
	}
	cb(null, true);
};

// init upload
const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
	'profile_pic' // <input name='profile_pic'..
);

// Process/start Upload file
let handleUploadFile = async (req, res) => {
	// 'profile_pic' is the name of our file input field in the HTML form
	// console.log(req.file);

	upload(req, res, function (err) {
		// req.file contains information of uploaded file
		// req.body contains information of text fields, if there were any
		if (req.fileValidationError) {
			// nếu file không hợp lệ (only file image)
			return res.send(req.fileValidationError);
		} else if (!req.file) {
			return res.send('Please select an image to upload');
		} else if (err instanceof multer.MulterError) {
			return res.send(err);
		} else if (err) {
			return res.send(err);
		}

		// Display uploaded image for user validation
		res.send(
			`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
		);
	});
};

// init upload multiple files

const uploadMultiple = multer({
	storage: storage,
	fileFilter: imageFilter,
}).array('multiple_images', 3); // 3 => số tố đa được upload là 3 file

// Multiple Files Upload
let handleUploadMultipleFile = async (req, res) => {
	uploadMultiple(req, res, function (err) {
		// req.file contains information of uploaded file
		// req.body contains information of text fields, if there were any
		if (req.fileValidationError) {
			// nếu file không hợp lệ (only file image)
			return res.send(req.fileValidationError);
			// Note : file (wrong) va files (correct)
		} else if (!req.files) {
			return res.send('Please select an image to upload');
		} else if (
			err instanceof multer.MulterError &&
			err.code === 'LIMIT_UNEXPECTED_FILE'
		) {
			return res.send('User are only allowes to upload 3 files !!');
		} else if (err) {
			return res.send(err);
		}

		let result = 'You have uploaded these images: <hr />';
		const files = req.files;
		let index, len;

		// Loop through all the uploaded images and display them on frontend
		for (index = 0, len = files.length; index < len; ++index) {
			// duong dan tu public/image/..=> show iamges
			result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
		}
		result += '<hr/><a href="/upload" >Upload more images</a>';
		res.send(result);
	});
};

module.exports = {
	getHomepage,
	getDetailPage,
	createNewUser,
	deleteUser,
	getEditPage,
	postUpdateUser,
	getUploadFilePage,
	handleUploadFile,
	handleUploadMultipleFile,
};
