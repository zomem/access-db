
import {redisClient, reTable} from '../utils/dbRedis'
import {TTable} from '../index'
import { isArray } from '../utils/utils'



function fetchSubscribe(channel: TTable | TTable[], callback: (message: string, channel: string) => {}): Promise<any>{
  return new Promise(async (resolve, reject)=>{
    try{
      const subscriber = redisClient.duplicate()
      await subscriber.connect()
      let tempC 
      if(isArray(channel)){
        tempC = channel as TTable[]
        tempC = tempC.map((item) => reTable(item))
      }else{
        tempC = reTable(channel)
      }
      await subscriber.pSubscribe(tempC, (m, c) => {
        callback(c, m)
      })
      resolve(true)
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchSubscribe