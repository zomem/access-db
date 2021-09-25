import _redis from 'redis'



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