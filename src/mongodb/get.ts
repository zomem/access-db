/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:52:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/get.ts
 */ 
import {mongodbCollection, mongodbId} from '../utils/dbMongodb'
import {isJson, isMongodbObjectId} from '../utils/utils'
import {MongodbGetRes, TTable, MongodbUpdateKey, MongodbSession} from '../index'



function fetchGet(table: TTable, uniKey: number | string | MongodbUpdateKey, session?: MongodbSession): Promise<MongodbGetRes>{
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
      
      let res: any = await db.collection(table).findOne(tempData, {session})
      resolve({data: res || {}})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}

export default fetchGet