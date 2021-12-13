
import {redisClient} from '../utils/dbRedis'
import {TTable, RedisSetRes, RedisSetParams} from '../index'
import setTrans from '../utils/setTrans'
import { PLATFORM_NAME } from '../constants/constants'



function fetchSet(table: TTable, params: RedisSetParams = {}, expire?: number): Promise<RedisSetRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      const tempData = setTrans<RedisSetParams>(params, table, PLATFORM_NAME.REDIS)
      let func: any = [], hkey: any = ''
      for(let i = 0; i < tempData.length; i++){
        switch(tempData[i].method){
          case 'SETNX':
            func.push(redisClient[tempData[i].method](tempData[i].key, tempData[i].value))
            if(expire) func.push(redisClient.PEXPIRE(tempData[i].key, expire))
            break
          case 'HSETNX':
            hkey = tempData[i].key
            func.push(redisClient[tempData[i].method](tempData[i].key, ...tempData[i].value))
            break
          default:
            break
        }
      }
      if(expire) func.push(redisClient.PEXPIRE(hkey, expire))
      func.push(redisClient.HGET(hkey, 'id'))
      const rData = await Promise.all(func)
      resolve({data: {insertId: rData[rData.length - 1] as string}})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchSet