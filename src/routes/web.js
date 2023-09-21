import express from 'express';
import homeController from '../controllers/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

let router = express.Router();

// ========= end upload file ========

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

	// URL post navbar
	router.get('/upload', homeController.getUploadFilePage);
	// post - signle upload file
	router.post('/upload-profile-pic', homeController.handleUploadFile);
	// post - multiple upload file
	router.post(
		'/upload-multiple-images',
		homeController.handleUploadMultipleFile
	);

	// --about---
	router.get('/about', (req, res) => {
		res.send(`I'm Ryo Pham IT`);
	});

	return app.use('/', router);
};

// module.exports = initWebRoute;

export default initWebRoute;
