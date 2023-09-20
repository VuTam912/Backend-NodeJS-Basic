import express from 'express';
import apiController from '../controllers/apiController';
// API similiar URL
let router = express.Router();

// Handle API route: localhost/..
const initAPIRoute = (app) => {
	// getHomepage = function
	router.get('/users', apiController.getAllUsers); // method GET -> READ data
	router.post('/create-user', apiController.createNewUser); // method POST -> READ data
	router.put('/update-user', apiController.updateUser); // method PUT -> UPDATE data
	router.delete('/delete-user/:id', apiController.deleteUser); // method DELETE -> DELETE data

	return app.use('/api/v1/', router);
};

// module.exports = initWebRoute;

export default initAPIRoute;
