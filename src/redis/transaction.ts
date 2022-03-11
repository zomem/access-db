
import {redisClient, reTable} from '../utils/dbRedis'
import {RedisTransactionRes, TTable} from '../index'


function fetchTransaction(): Promise<RedisTransactionRes>{
  return new Promise(async (resolve_all, reject_all)=>{
    try{
      
      // 开始事务
      let begin = (callback) => {
        return new Promise(async (resolve, reject) => {
          await redisClient.sendCommand(['MULTI'])
          await callback()
          resolve(true)
        })
      }
            
      // 触发事务
      let commit = (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
          const res = await redisClient.sendCommand(['EXEC'])
          resolve(res)
        })
      }

      // 放弃事务
      let discard = (): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
          await redisClient.sendCommand(['DISCARD'])
          resolve(true)
        })
      }

      //check-and-set实现乐观锁 
      let watch = (table: TTable, id: number | string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
          let hkey: string = reTable(table) + ':' + id
          await redisClient.sendCommand(['WATCH', hkey])
          resolve(true)
        })
      }

      resolve_all({
        begin,
        discard,
        commit,
        watch,
      })
    }catch(err: any){
      reject_all(err)
    }
  })
}


export default fetchTransaction

