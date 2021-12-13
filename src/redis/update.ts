
import {redisClient} from '../utils/dbRedis'
import {RedisUpdateRes, RedisUpdateParams, TTable} from '../index'
import updateTrans from '../utils/updateTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchUpdate(table: TTable, id: string | number, params: RedisUpdateParams = {}, expire?: number): Promise<RedisUpdateRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      const tempData = updateTrans<RedisUpdateParams>(params, [table, id], PLATFORM_NAME.REDIS)
      let func: any = [], hkey: any = ''
      for(let i = 0; i < tempData.length; i++){
        switch(tempData[i].method){
          case 'SETNX':
            func.push(redisClient[tempData[i].method](tempData[i].key, tempData[i].value))
            if(expire) func.push(redisClient.PEXPIRE(tempData[i].key, expire))
            break
          case 'HSET':
            hkey = tempData[i].key
            func.push(redisClient[tempData[i].method](tempData[i].key, ...tempData[i].value))
            break
          case 'HDEL':
            hkey = tempData[i].key
            func.push(redisClient[tempData[i].method](tempData[i].key, tempData[i].value))
            break
          case 'HINCRBYFLOAT':
            hkey = tempData[i].key
            func.push(redisClient[tempData[i].method](tempData[i].key, ...tempData[i].value))
            break
          case 'HINCRBY':
            hkey = tempData[i].key
            func.push(redisClient[tempData[i].method](tempData[i].key, ...tempData[i].value))
            break
          default:
            break
        }
      }
      if(expire) func.push(redisClient.PEXPIRE(hkey, expire))
      await Promise.all(func)
      resolve({data: {modifiedCount: 1}})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchUpdate