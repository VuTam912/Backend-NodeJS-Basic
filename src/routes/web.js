import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

// Handle web route: localhost/..
const initWebRoute = (app) => {
	// getHomepage = function
	router.get('/', homeController.getHomepage);
	router.get('/detail/user/:id', homeController.getDetailPage);

	//post - create
	router.post('/create-new-user', homeController.createNewUser);

	router.get('/about', (req, res) => {
		res.send(`I'm Ryo Pham IT`);
	});

	return app.use('/', router);
};

// module.exports = initWebRoute;

export default initWebRoute;
