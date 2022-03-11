
import {redisClient, reTable} from '../utils/dbRedis'
import {TTable} from '../index'



function fetchPublish(channel: TTable, message: string): Promise<any>{
  return new Promise(async (resolve, reject)=>{
    try{
      const publisher = redisClient.duplicate()
      await publisher.connect()
      await publisher.publish(reTable(channel), message);
      resolve(true)
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchPublish