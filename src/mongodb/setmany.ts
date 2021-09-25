/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/setOneMany.ts
 */ 
import {mongodbCollection} from '../utils/dbMongodb'
import {changeSetManyParams, isArray} from '../utils/utils'
import {TTable, MongodbSetParams, MongodbSetmanyRes} from '../index'
import {SET_MANY_PARAMS_ARR_ERROR} from '../constants/error'

const {client, db} = mongodbCollection


function fetchSetmany(table: TTable, params: MongodbSetParams[]): Promise<MongodbSetmanyRes>{
  if(!client) return
  if(!isArray(params)) throw new Error(SET_MANY_PARAMS_ARR_ERROR)
  return new Promise(async (resolve, reject)=>{
    try{
      await client.connect()
      let res = await db.collection(table).insertMany(changeSetManyParams(params), {ordered: true})
      await client.close()
      resolve({data: res})
    }catch(err){
      await client.close()
      reject(err)
    }
  })
}

export default fetchSetmany