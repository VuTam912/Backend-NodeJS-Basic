// Connection to Database (SQL)
// get the client
import mysql from 'mysql2';

// create the connection to database -
// Note: add password to run MySQL workbench
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'nodejs_basic',
});

export default connection;
