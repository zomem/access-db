
import {redisClient, reTable} from '../utils/dbRedis'
import {RedisGetRes, TTable} from '../index'


function fetchGet(table: TTable, id: number | string): Promise<RedisGetRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      let func: any = [], hkey: string = reTable(table) + ':' + id
      func.push(redisClient.PTTL(hkey))
      func.push(redisClient.HGETALL(hkey))
      const [r1, r2] = (await Promise.all(func)) as any
      let resdata = {}
      if(r2['id']){
        resdata = {_expire: r1, ...r2}
      }
      resolve({data: resdata})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchGet