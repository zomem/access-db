import {isArray} from '../utils/utils'
import {TTable, RedisSetParams, RedisSetmanyRes} from '../index'
import {SET_MANY_PARAMS_ARR_ERROR, PARAMS_EMPTY_ARR_ERROR} from '../constants/error'
import fetchSet from './set'

function fetchSetmany(table: TTable, params: RedisSetParams[], expire?: number): Promise<RedisSetmanyRes>{
  if(!isArray(params)) throw new Error(SET_MANY_PARAMS_ARR_ERROR)
  if(params.length === 0) throw new Error(PARAMS_EMPTY_ARR_ERROR)
  return new Promise(async (resolve, reject)=>{
    try{
      for(let i = 0; i < params.length; i++){
        let p = params[params.length - 1 - i]
        if(expire){
          await fetchSet(table, p, expire)
        }else{
          await fetchSet(table, p)
        }
      }
      resolve({data: {}})
    }catch(err: any){
      reject(err)
    }
  })
}

export default fetchSetmany