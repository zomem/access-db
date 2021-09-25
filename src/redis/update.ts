
import {redisClient} from '../utils/dbRedis'
import {TStructure, RedisUpdateRes, RedisUpdateParams, RedisStringUpdateParams} from '../index'
import updateTrans from '../utils/updateTrans'
import {PLATFORM_NAME} from '../constants/constants'
import {REDIS_SET_ERROR} from '../constants/error'

function fetchUpdate(structure: 'string', params: RedisStringUpdateParams): Promise<RedisUpdateRes | string>
function fetchUpdate(structure: TStructure, params: RedisUpdateParams = {}): Promise<RedisUpdateRes | string>{
  return new Promise((resolve, reject)=>{
    let tempData: {keyValue: any[], method: string, key: string[]} = updateTrans(params, {structure}, PLATFORM_NAME.REDIS)
    if(tempData.keyValue.length < 2){
      throw new Error(REDIS_SET_ERROR)
    }
    // TODO  过期时间、过期日期的更新
    redisClient[tempData.method](...tempData.keyValue, async (err, reply) => {
      if (err) {
        reject({err})
      }
      resolve({data: reply})
    })
  })
}


export default fetchUpdate