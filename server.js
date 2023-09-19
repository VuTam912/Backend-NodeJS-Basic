const http = require('http');

const server = http.createServer((req, res) => {
	console.log('run request...');
	res.setHeader('Content-Type', 'text/html');
	res.write('<h3>Hello World</h3>');
	res.write('<h2>dev by Ryo IT </h2>');
	res.end();
});

server.listen(3000, 'localhost', () => {
	console.log('Node.Js server is running on port: 3000');
});
