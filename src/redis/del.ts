
import {redisClient} from '../utils/dbConnect'
import {IRedisDeleteRes} from '../index'

function fetchDel(keys: string | string[]): Promise<IRedisDeleteRes>{
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