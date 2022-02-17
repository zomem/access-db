
import {redisClient, reTable} from '../utils/dbRedis'
import {RedisDeleteRes, TTable} from '../index'
import {isArray} from '../utils/utils'
import {PARAMS_EMPTY_ARR_ERROR, PARAMS_NOT_ARR_ERROR} from '../constants/error'

function fetchDelmany(table: TTable, ids: number[] | string[]): Promise<RedisDeleteRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      if(!isArray(ids)) throw new Error(PARAMS_NOT_ARR_ERROR)
      if(ids.length === 0) throw new Error(PARAMS_EMPTY_ARR_ERROR)
      let delArr: string[] = []
      for(let i = 0; i < ids.length; i++){
        delArr.push(reTable(table) + ':' + ids[i])
        delArr.push(reTable(table) + ':id:key:' + ids[i])
      }
      const r = (await redisClient.DEL(delArr)) as any
      resolve({data: {deletedCount: r/2}})
    }catch(err: any){
      reject(err)
    }
  })
}

export default fetchDelmany