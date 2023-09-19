import express from 'express';

// To render html and code javascript in html
const configViewEngine = (app) => {
	app.set('view engine', 'ejs');
	app.set('views', './src/views');
};

// module.exports
export default configViewEngine;
