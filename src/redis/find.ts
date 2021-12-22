import {redisClient} from '../utils/dbRedis'
import {RedisFindRes, TTable, RedisCheckParams} from '../index'
import {stringTimeNumSort, RedisSortNum, RedisSortStr} from '../utils/utils'
import findTrans from '../utils/findTrans'
import { PLATFORM_NAME } from '../constants/constants'

function fetchFind(table: TTable, params: RedisCheckParams = {}): Promise<RedisFindRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      let func: any = [], fkeys: string = table + ':id:key:*'
      let skeys = await redisClient.KEYS(fkeys)
      let result: any = []

      if(skeys.length === 0){
        return resolve({data: {objects: result || []}})
      }
      let limit = (params.limit || 20)
      let all = limit * (params.page || 1)
      // 仅翻页的情况
      if(!params.r && !params.orderBy){
        let skeysValueList = await redisClient.MGET(skeys)
        let newSkeys = stringTimeNumSort(skeysValueList, skeys)
        
        let pskeys: string[] = [] // 每页的
        if(params.limit){
          pskeys = newSkeys.slice(all - limit, all)
        }else{
          pskeys = newSkeys
        }
        let hkeys: string[] = []
        for(let j = 0; j < pskeys.length; j++){
          hkeys.push(pskeys[j].replace('id:key:', ''))
        }
        for(let i = 0; i < hkeys.length; i++){
          func.push(redisClient.HGETALL(hkeys[i]))
        }      
        result = (await Promise.all(func)) as any
        
      }else{
        let newarr: any = [], t_json, newSkeys

        if(!params.orderBy){
          let skeysValueList = await redisClient.MGET(skeys)
          newSkeys = stringTimeNumSort(skeysValueList, skeys)
          for(let j = 0; j < newSkeys.length; j++){
            func.push(redisClient.HGETALL(newSkeys[j].replace('id:key:', '')))
          }
        }else{
          for(let j = 0; j < skeys.length; j++){
            func.push(redisClient.HGETALL(skeys[j].replace('id:key:', '')))
          }
        }

        newarr = (await Promise.all(func)) as any

        if(newarr.length > 0 && params.orderBy){
          let tempOrder = params.orderBy[0].substr(1)
          let isNum = +newarr[0][tempOrder] === NaN ? false : true
          if(params.orderBy[0][0] === '-'){
            newarr = isNum ? RedisSortNum(newarr, tempOrder, 0) : RedisSortStr(newarr, tempOrder, 0)
          }else{
            newarr = isNum ? RedisSortNum(newarr, tempOrder, 1) : RedisSortStr(newarr, tempOrder, 1)
          }
        }
        
        let index: number = 0
        while (index < all && index < newarr.length) {
          if(index >= all - limit){
            t_json = newarr[index]
            let isOk = findTrans(params, 1, t_json, PLATFORM_NAME.REDIS)
            if(isOk){
              result.push(t_json)
            }
          }
          index++
        }
      }

      resolve({data: {objects: result || []}})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchFind