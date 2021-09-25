
import {redisClient, redisGetExpire} from '../utils/dbRedis'
import {TStructure, RedisGetRes, RedisGetQuery} from '../index'
import getTrans from '../utils/getTrans'
import {PLATFORM_NAME} from '../constants/constants'
import {isArray} from '../utils/utils'



function fetchGet(structure: 'string', params: string | string[], query?: RedisGetQuery): Promise<RedisGetRes>
function fetchGet(structure: TStructure, params: string | string[]='', query: RedisGetQuery = {}): Promise<RedisGetRes>{
  return new Promise((resolve, reject)=>{
    let tempGet: {method: string, key: string[]} = getTrans(params, {structure}, PLATFORM_NAME.REDIS)
    
    redisClient[tempGet.method](...tempGet.key, async (err, reply) => {
      try{
        if (err) {
          reject({err})
        }
        let tempRes = {}
        if(query.expireSec){
          tempRes['expireSec'] = {}
          for(let k = 0; k < tempGet.key.length; k++){
            let t = await redisGetExpire(tempGet.key[k], 1)
            tempRes[tempGet.key[k]] = isArray(reply) ? reply[k] : reply
            tempRes['expireSec'][tempGet.key[k]] = t
          }
        }else if(query.expireMillisec){
          tempRes['expireMillisec'] = {}
          for(let k = 0; k < tempGet.key.length; k++){
            let t = await redisGetExpire(tempGet.key[k], 2)
            tempRes[tempGet.key[k]] = isArray(reply) ? reply[k] : reply
            tempRes['expireMillisec'][tempGet.key[k]] = t
          }
        }else{
          for(let k = 0; k < tempGet.key.length; k++){
            tempRes[tempGet.key[k]] = isArray(reply) ? reply[k] : reply
          }
        }
        resolve({data: tempRes})
      }catch(err2){
        reject(err2)
      }
    })

  })
}


export default fetchGet