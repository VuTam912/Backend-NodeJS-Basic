// Connection to Database (SQL) |
// get the client
import mysql from 'mysql2/promise'; // promise => only apply createPool

// create the connection to database -
// Note: add password to run MySQL workbench
const connectionPool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'nodejs_basic',
});

// su dung connection Pool giúp viết code ngăn hơn và query tốt hơn
export default connectionPool;
