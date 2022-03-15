import {redisClient, reTable} from '../utils/dbRedis'
import {TTable, RedisQueueRes, RedisQueueMethod} from '../index'
import { isArray } from '../utils/utils'


function fetchQueue(queueName: TTable, method: 'remove', params: string[]): Promise<RedisQueueRes>
function fetchQueue(queueName: TTable, method: 'pop', params: number): Promise<RedisQueueRes>
function fetchQueue(queueName: TTable, method: 'push', params: string | string[]): Promise<RedisQueueRes>
function fetchQueue(queueName: TTable, method: RedisQueueMethod, params): Promise<RedisQueueRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      const queue = reTable(queueName)
      const _queue = reTable(queueName + '_queue_backups')

      let func: any = []
      switch(method) {
        case 'push':
          if(!params) break
          if(params.length === 0) break
          func.push(redisClient.LPUSH(queue, isArray(params) ? params.reverse() : params))
          break
        case 'pop':
          for(let i = 0; i < params; i++){
            func.unshift(redisClient.RPOPLPUSH(queue, _queue))
          }
          break
        case 'remove':
          if(!params) break
          if(params.length === 0) break
          if(!isArray(params)){
            params = [params]
          }
          for(let j = 0; j < params.length; j++){
            func.push(redisClient.LREM(_queue, 1, params[j]))
          }
          break
        default:
          break
      }
      
      func.push(redisClient.LRANGE(queue, 0, -1))
      func.push(redisClient.LRANGE(_queue, 0, -1))
      const rData = await Promise.all(func)
      resolve({data: {
        queue: rData[rData.length - 2],
        pop: method === 'pop' ? rData.slice(0, rData.length - 2) : [],
        _queue: rData[rData.length - 1],
      }})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchQueue