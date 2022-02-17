

import {redisClient, reTable} from '../utils/dbRedis'
import {CountRes, TTable, RedisCountParams} from '../index'
import findTrans from '../utils/findTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchCount(table: TTable, params: RedisCountParams = {}): Promise<CountRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      let fkeys: string = reTable(table) + ':id:key:*'
      let skeys = await redisClient.KEYS(fkeys)
      let num: number = 0
      if(!params.r){
        num = skeys.length
      }else{
        let newarr: any = [], t_json, func: any = []
        for(let j = 0; j < skeys.length; j++){
          func.push(redisClient.HGETALL(skeys[j].replace('id:key:', '')))
        }
        newarr = (await Promise.all(func)) as any
        let index: number = 0
        while (index < newarr.length) { 
          t_json = newarr[index]
          let isOk = findTrans(params, 1, t_json, PLATFORM_NAME.REDIS)
          if(isOk){
            num++
          }
          index++
        }
      }
      resolve({data: num})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchCount



