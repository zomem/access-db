import {redisClient, reTable} from '../utils/dbRedis'
import {TTable, RedisQueueRes, RedisQueueMethod} from '../index'
import { isArray } from '../utils/utils'


function fetchQueue(queueName: TTable, method: 'get'): Promise<RedisQueueRes>
function fetchQueue(queueName: TTable, method: 'remove', params: string[], unique?: boolean): Promise<RedisQueueRes>
function fetchQueue(queueName: TTable, method: 'pop', params: number): Promise<RedisQueueRes>
function fetchQueue(queueName: TTable, method: 'push', params: string | string[], unique?: boolean): Promise<RedisQueueRes>
function fetchQueue(queueName: TTable, method: RedisQueueMethod, params?: number | string | string[], unique?: boolean): Promise<RedisQueueRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      const queue = reTable(queueName)
      const _queue = reTable(queueName + '_queue_backups')

      let func: any = [], tempParams: string[] = []

      if(isArray(params)){
        tempParams = params as string[]
      }else if(typeof(params) === 'string'){
        tempParams = [params]
      }
      switch(method) {
        case 'push':
          if(tempParams.length === 0) break
          if(unique){
            for(let j = 0; j < tempParams.length; j++){
              func.push(redisClient.LREM(queue, 0, tempParams[j]))
            }
          }
          func.push(redisClient.LPUSH(queue, tempParams.reverse()))
          break
        case 'pop':
          for(let i = 0; i < params; i++){
            func.unshift(redisClient.RPOPLPUSH(queue, _queue))
          }
          break
        case 'remove':
          if(tempParams.length === 0) break
          for(let j = 0; j < tempParams.length; j++){
            func.push(redisClient.LREM(_queue, unique ? 0 : 1, tempParams[j]))
          }
          break
        case 'get':
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