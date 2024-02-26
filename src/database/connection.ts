import mysql from 'promise-mysql';
import config from '../config';

const connection = mysql.createConnection({
    host: config.DB_host,
    port: config.DB_port,
    database: config.DB_database,
    user: config.DB_user,
    password: config.DB_password,
    timezone: config.DB_timezone
});

connection.catch((err: any) => {
    console.error('Database connection error:', err);
});

const getConnection = () => {
    return connection;
}
export default getConnection;