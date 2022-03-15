/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@minappjs/weapp/src/count.ts
 */ 
import {mongodbCollection} from '../utils/dbMongodb'
import {TTable, MongodbCountParams, CountRes, MongodbSession} from '../index'
import {PLATFORM_NAME} from '../constants/constants'
import findTrans from '../utils/findTrans'


function fetchCount(table: TTable, params: MongodbCountParams = {}, session?: MongodbSession): Promise<CountRes>{
  return new Promise(async (resolve, reject)=>{
    const {client, db} = await mongodbCollection()
    if(!client) return
    try{
      let QQ = findTrans<MongodbCountParams>(params, 1, null, PLATFORM_NAME.MONGODB) || {}
      await client.connect()
      let res: any = await db.collection(table).countDocuments(QQ === 2 ? {} : QQ, {session})
      resolve({data: res})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}


export default fetchCount