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



function fetchSet(table: TTable, params: MongodbSetParams): Promise<MongodbSetRes>{
  return new Promise(async (resolve, reject)=>{
    const {client, db} = await mongodbCollection()
    if(!client) return
    try{
      await client.connect()
      let res = await db.collection(table).insertOne(changeSetParams(params))
      resolve({data: res})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}


export default fetchSet