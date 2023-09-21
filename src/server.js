// Express JS
// const express = require('express'); // require (old) = import (new)
import express from 'express';
import configViewEngine from './configs/viewEngine';
import 'dotenv/config'; // old => require('dotenv').config()
import initWebRoute from './routes/web';
import connection from './configs/connectDB'; // call connection SQL (database)
import initAPIRoute from './routes/api';
var morgan = require('morgan'); // middleware

// Trong server.js phải viêt theo quy tấc chạy từ trên xuống (ko chạy random)

const app = express();
const port = process.env.PORT || 3001;

// check
app.use((req, res, next) => {
	// check => return res.send() or có thể áp dụng check login có hợp lệ ko ?
	// nếu hợp lệ thì chạy next()..
	console.log('-- run into my middleware');
	console.log(req.method);
	next(); // neu middleware check hop le thi tiep tuc execute.
});

// app.use <= middleware |
app.use(morgan('combined')); //middleware log

// setup req.body => handle input post | chuyển data JSON sang Object của javascript
app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: true }));

// setup View Engine - render html with code javascript
configViewEngine(app);

// init web Route - điều hướng URL
initWebRoute(app);

// init api Route
initAPIRoute(app);

// handle 404 not found (page) - note: khong nên để nó ở trên. Phải cho hàm ở trên load xong.
app.use((req, res) => {
	return res.render('404.ejs');
});

app.listen(port, () => {
	console.log(`Express server is running at http://localhost:${port}`);
});
