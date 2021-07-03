
import {redisClient, redisExpire} from '../utils/dbConnect'
import {TStructure, IRedisSetQuery, IRedisSetRes} from '../index'
import setTrans from '../utils/setTrans'
import { PLATFORM_NAME } from '../constants/constants'
import {REDIS_SET_ERROR} from '../constants/error'




function fetchSet(structure: 'string', params: any, query?: IRedisSetQuery): Promise<IRedisSetRes>
function fetchSet(structure: TStructure, params: any = {}, query: IRedisSetQuery = {}): Promise<IRedisSetRes>{
  return new Promise((resolve, reject)=>{
    let tempSet: {keyValue: any[], method: string, key: string[]} = setTrans(params, {structure, ...query}, PLATFORM_NAME.REDIS)
    if(tempSet.keyValue.length < 2){
      throw new Error(REDIS_SET_ERROR)
    }
    
    redisClient[tempSet.method](...tempSet.keyValue, async (err, reply) => {
      try{
        if (err) {
          reject({err})
        }
        if(query.expireSec){
          for(let k = 0; k < tempSet.key.length; k++){
            await redisExpire(tempSet.key[k], query.expireSec, 1)
          }
        }else if(query.expireMillisec){
          for(let k = 0; k < tempSet.key.length; k++){
            await redisExpire(tempSet.key[k], query.expireMillisec, 2)
          }
        }else if(query.expireAt){
          for(let k = 0; k < tempSet.key.length; k++){
            await redisExpire(tempSet.key[k], query.expireAt, 3)
          }
        }else if(query.expireMilliAt){
          for(let k = 0; k < tempSet.key.length; k++){
            await redisExpire(tempSet.key[k], query.expireMilliAt, 4)
          }
        }
        resolve({data: reply})
      }catch(err2){
        reject(err2)
      }
    })
  })
}


export default fetchSet