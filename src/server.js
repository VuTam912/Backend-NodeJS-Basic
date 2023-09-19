// Express JS
// const express = require('express'); // require (old) = import (new)
import express from 'express';
import configViewEngine from './configs/viewEngine';
import 'dotenv/config'; // old => require('dotenv').config()
import initWebRoute from './routes/web';
import connection from './configs/connectDB'; // call connection SQL (database)

const app = express();
const port = process.env.PORT || 3001;

// Config View Engine - render html with code javascript
configViewEngine(app);

// Config web Route - điều hướng URL
initWebRoute(app);

app.listen(port, () => {
	console.log(`Express server is running at http://localhost:${port}`);
});
