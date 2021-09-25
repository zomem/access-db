/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/set.ts
 */ 
import {mongodbCollection} from '../utils/dbMongodb'
import {changeSetParams} from '../utils/utils'
import {TTable, MongodbSetParams, MongodbSetRes} from '../index'

const {client, db} = mongodbCollection


function fetchSet(table: TTable, params: MongodbSetParams): Promise<MongodbSetRes>{
  if(!client) return
  return new Promise(async (resolve, reject)=>{
    try{
      await client.connect()
      let res = await db.collection(table).insertOne(changeSetParams(params))
      await client.close()
      resolve({data: res})
    }catch(err){
      await client.close()
      reject(err)
    }
  })
}


export default fetchSet