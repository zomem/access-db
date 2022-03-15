/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:58:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/update.ts
 */ 
import {mongodbCollection, mongodbId} from '../utils/dbMongodb'
import {isJson, isMongodbObjectId} from '../utils/utils'
import {MongodbUpdateParams, TTable, MongodbUpdateRes, MongodbUpdateKey, MongodbSession} from '../index'
import updateTrans from '../utils/updateTrans'
import {PLATFORM_NAME} from '../constants/constants'



function fetchUpdate(table: TTable, uniKey: string | MongodbUpdateKey, params: MongodbUpdateParams, session?: MongodbSession): Promise<MongodbUpdateRes>{
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
      let records = updateTrans<MongodbUpdateParams>(params, {}, PLATFORM_NAME.MONGODB)
      let res = await db.collection(table).updateOne(tempData, records, {session})
      resolve({data: res})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}


export default fetchUpdate