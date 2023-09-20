// Express JS
// const express = require('express'); // require (old) = import (new)
import express from 'express';
import configViewEngine from './configs/viewEngine';
import 'dotenv/config'; // old => require('dotenv').config()
import initWebRoute from './routes/web';
import connection from './configs/connectDB'; // call connection SQL (database)
import initAPIRoute from './routes/api';

const app = express();
const port = process.env.PORT || 3001;

// setup req.body => handle input post | chuyển data JSON sang Object của javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup View Engine - render html with code javascript
configViewEngine(app);

// init web Route - điều hướng URL
initWebRoute(app);

// init api Route
initAPIRoute(app);

app.listen(port, () => {
	console.log(`Express server is running at http://localhost:${port}`);
});
