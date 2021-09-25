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
import {MongodbUpdateParams, TTable, MongodbUpdateRes, MongodbUpdateKey} from '../index'
import updateTrans from '../utils/updateTrans'
import {PLATFORM_NAME} from '../constants/constants'

const {client, db} = mongodbCollection


function fetchUpdate(table: TTable, uniKey: string | MongodbUpdateKey, params: MongodbUpdateParams): Promise<MongodbUpdateRes>{
  if(!client) return
  return new Promise(async (resolve, reject)=>{
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
      let res = await db.collection(table).updateOne(tempData, records)
      await client.close()
      resolve({data: res})
    }catch(err){
      await client.close()
      reject(err)
    }
  })
}


export default fetchUpdate