// Express JS
// const express = require('express'); // require (old) = import (new)
import express from 'express';
import configViewEngine from './configs/viewEngine';
import 'dotenv/config'; // old => require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;

// Config View Engine - render html with code javascript
configViewEngine(app);

// route
app.get('/', (req, res) => {
	res.render('test/index.ejs');
});

app.get('/about', (req, res) => {
	res.send(`I'm Ryo Pham IT`);
});

app.listen(port, () => {
	console.log(`Express server is running at http://localhost:${port}`);
});
