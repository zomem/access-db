
import {redisClient} from '../utils/dbRedis'
import {RedisDeleteRes} from '../index'

function fetchDel(keys: string | string[]): Promise<RedisDeleteRes>{
  return new Promise((resolve, reject)=>{
    redisClient.del(keys, async (err, reply) => {
      if (err) {
        reject({err})
      }
      resolve({data: reply})
    })
  })
}

export default fetchDel