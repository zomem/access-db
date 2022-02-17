
import {redisClient, reTable} from '../utils/dbRedis'
import {RedisDeleteRes, TTable} from '../index'

function fetchDel(table: TTable, id: number | string): Promise<RedisDeleteRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      let hkey: string = reTable(table) + ':' + id, skey: string = table + ':id:key:' + id
      const r = (await redisClient.DEL([hkey, skey])) as any
      resolve({data: {deletedCount: r/2}})
    }catch(err: any){
      reject(err)
    }
  })
}

export default fetchDel