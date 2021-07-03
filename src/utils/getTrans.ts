import {PLATFORM_NAME, REDIS_STRUCTURE} from '../constants/constants'
import { REDIS_SET_ERROR } from '../constants/error'
import { isArray } from './utils'


export default function getTrans<T>(params: T, query, dbType){
  let result:any
  if(dbType === PLATFORM_NAME.REDIS){
    let temp = params as unknown as string[]
    let key:any = [], method: string = 'get', ni = 0
    if(isArray(temp)){
      for(let pa of temp){
        switch(query.structure){
          case REDIS_STRUCTURE.string:
            key.push(pa)
            if(ni > 0){
              method = 'mget'
            }else{
              method = 'get'
            }
            ni++
            break
          default:
            throw new Error(REDIS_SET_ERROR)
        }
      }
    }else{
      switch(query.structure){
        case REDIS_STRUCTURE.string:
          key.push(temp)
          method = 'get'
          break
        default:
          throw new Error(REDIS_SET_ERROR)
      }
    }
    result = {key, method}
  }
  return result
}