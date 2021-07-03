import _redis from 'redis'
import _mysql from 'mysql'
import _mongodb from 'mongodb'


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






/**
 * 
 *  MONGODB_HOST=
 *  MONGODB_USER=
 *  MONGODB_PASSWORD=
 *  MONGODB_DATABASE=
 *  MONGODB_PORT=
 *  
 */
// mongodb 连接
export const mongodbCollection = (callback) => {
  if(!process.env.MONGODB_HOST) return null
  let dbUri = 'mongodb://' 
      + process.env.MONGODB_HOST + ':' 
      + (process.env.MONGODB_PORT || '27017')
      
  if(process.env.MONGODB_USER){
    dbUri = 'mongodb://' 
      + process.env.MONGODB_USER + ':' 
      + process.env.MONGODB_PASSWORD + '@' 
      + process.env.MONGODB_HOST + ':' 
      + (process.env.MONGODB_PORT || '27017')
  }

  _mongodb.MongoClient.connect(dbUri, {useUnifiedTopology: true}, (err, client) => {
    if(err) throw new Error(JSON.stringify(err))
    let db = client.db(process.env.MONGODB_DATABASE)
    callback(db, client)
  })
}

export const mongodbId = (id) => {
  let hex = /^[a-fA-F0-9]{24}$/
  let tempId = (hex.test(id as string)) ? (new _mongodb.ObjectID(id)) : id
  return tempId
}

export const mongodb = process.env.MONGODB_HOST ? _mongodb : null






/**
 * 
 */
// let client = redis.createClient(redisPort, redisAddress, { auth_pass: redisPassword });
let redisOptions: any = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT) || 6379,
}
if(process.env.REDIS_AUTH_PASS){
  redisOptions.auth_pass = process.env.REDIS_AUTH_PASS
}
if(process.env.REDIS_PASSWORD){
  redisOptions.password = process.env.REDIS_PASSWORD
}
export const redisClient = process.env.REDIS_HOST ? _redis.createClient(redisOptions) : null
// redisClient.on("error", function (err) {
//   console.log("Error " + err);
// });
export const redisExpire = async (key: string, time: number, type?: 1 | 2 | 3 | 4) => {
  return new Promise((resolve, reject) => {
    if(type === 1){
      redisClient.expire(key, time, (err, reply) => {
        if(err) reject(err)
        resolve(reply)
      })
    }else if(type === 2){
      redisClient.pexpire(key, time, (err, reply) => {
        if(err) reject(err)
        resolve(reply)
      })
    }else if(type === 3){
      redisClient.expireat(key, time, (err, reply) => {
        if(err) reject(err)
        resolve(reply)
      })
    }else if(type === 4){
      redisClient.pexpireat(key, time, (err, reply) => {
        if(err) reject(err)
        resolve(reply)
      })
    }
  })
}

export const redisGetExpire = async (key: string, type?: 1 | 2) => {
  return new Promise((resolve, reject) => {
    if(type === 1){
      redisClient.ttl(key, (err, reply) => {
        if(err) reject(err)
        resolve(reply)
      })
    }else if(type === 2){
      redisClient.pttl(key, (err, reply) => {
        if(err) reject(err)
        resolve(reply)
      })
    }
  })
}