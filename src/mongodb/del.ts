/*
 * @Author: your name
 * @Date: 2020-01-24 11:03:54
 * @LastEditTime: 2020-06-06 08:49:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /minapp-fetch/src/fetch/data/delete.ts
 */
import {mongodbCollection, mongodbId} from '../utils/dbMongodb'
import {isJson, isMongodbObjectId} from '../utils/utils'
import {TTable, MongodbDeleteRes, MongodbUpdateKey, MongodbSession} from '../index'


function fetchDel(table: TTable, uniKey: number | string | MongodbUpdateKey, session?: MongodbSession): Promise<MongodbDeleteRes>{
  return new Promise(async (resolve, reject)=>{
    const {client, db} = await mongodbCollection()
    if(!client) return
    try{
      let tempData: any = {}
      if(isMongodbObjectId(uniKey)){
        tempData['_id'] = uniKey
      }else{
        if(isJson(uniKey)){
          tempData = uniKey
        }else{
          tempData['_id'] = mongodbId(uniKey)
        }
      }
      await client.connect()
      let res: any = await db.collection(table).deleteOne(tempData, {session})
      resolve({data: res})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}


export default fetchDel