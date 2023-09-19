// Express JS
const express = require('express'); // require = import
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello World! vs Ryo Pham IT');
});

app.get('/about', (req, res) => {
	res.send(`I'm Ryo Pham IT`);
});

app.listen(port, () => {
	console.log(`Express server is running at http://localhost:${port}`);
});
