import express from 'express';

// To render html and code javascript in html
const configViewEngine = (app) => {
	app.use(express.static('./src/public')); // static file
	app.set('view engine', 'ejs');
	app.set('views', './src/views'); // all file to render in the views folder and do not need to be written './src/view' again
};

// module.exports
export default configViewEngine;
