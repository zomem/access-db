/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@minappjs/weapp/src/count.ts
 */ 
import {mongodbCollection} from '../utils/dbMongodb'
import {TTable, MongodbCountParams, CountRes} from '../index'
import {PLATFORM_NAME} from '../constants/constants'
import findTrans from '../utils/findTrans'

const {client, db} = mongodbCollection


function fetchCount(table: TTable, params: MongodbCountParams = {}): Promise<CountRes>{
  if(!client) return
  return new Promise(async (resolve, reject)=>{
    try{
      let QQ = findTrans<MongodbCountParams>(params, 1, null, PLATFORM_NAME.MONGODB) || {}
      await client.connect()
      let res: any = await db.collection(table).find(QQ === 2 ? {} : QQ).count()
      await client.close()
      resolve({data: res})
    }catch(err){
      await client.close()
      reject(err)
    }
  })
}


export default fetchCount