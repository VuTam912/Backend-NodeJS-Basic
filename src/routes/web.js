import express from 'express';
import homeController from '../controllers/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

let router = express.Router();

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

// loc file
const imageFilter = function (req, file, cb) {
	// Accept images only
	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
		req.fileValidationError = 'Only image files are allowed!';
		return cb(new Error('Only image files are allowed!'), false);
	}
	cb(null, true);
};

// init upload
let upload = multer({ storage: storage, fileFilter: imageFilter });

// Handle web route: localhost/..
const initWebRoute = (app) => {
	// getHomepage = function
	router.get('/', homeController.getHomepage);
	router.get('/detail/user/:id', homeController.getDetailPage);

	// post - create
	router.post('/create-new-user', homeController.createNewUser);
	// post - delete
	router.post('/delete-user', homeController.deleteUser);

	// get/post - edit and update
	router.get('/edit-user/:id', homeController.getEditPage);
	router.post('/update-user', homeController.postUpdateUser);

	// URL navbar - and post - upload
	router.get('/upload', homeController.getUploadFilePage);
	router.post(
		'/upload-profile-pic',
		upload.single('profile_pic'),
		homeController.handleUploadFile
	);

	router.get('/about', (req, res) => {
		res.send(`I'm Ryo Pham IT`);
	});

	return app.use('/', router);
};

// module.exports = initWebRoute;

export default initWebRoute;
