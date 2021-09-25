import _mysql from 'mysql'


/**
 * 
 *  MYSQL_HOST=
 *  MYSQL_USER=
 *  MYSQL_PASSWORD=
 *  MYSQL_DATABASE=
 *  MYSQL_PORT=
 *  MYSQL_CONNECTION_LIMIT=
 *  MYSQL_CHARSET=
 */
//mysql 链接池
const pool = process.env.MYSQL_HOST ? _mysql.createPool({
  connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT || '10'),
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  charset: process.env.MYSQL_CHARSET || 'UTF8_GENERAL_CI'
}) : null
export const mysqlPool = () => {
  return pool
}

export const mysqlConnect = (sql, sqlArr, callback) => {
  pool.getConnection((err, connection) => {
    if(err) throw new Error(JSON.stringify(err))
    connection.query(sql, sqlArr, callback)
    connection.release()
  })
}

