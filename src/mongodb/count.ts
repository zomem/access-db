/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@minappjs/weapp/src/count.ts
 */ 
import {mongodbCollection} from '../utils/dbConnect'
import {TTable, IMongodbCountParams, ICountRes} from '../index'
import {PLATFORM_NAME} from '../constants/constants'
import findTrans from '../utils/findTrans'

function fetchCount(table: TTable, params: IMongodbCountParams): Promise<ICountRes>{
  return new Promise((resolve, reject)=>{
    mongodbCollection((db, client) => {
      let QQ = findTrans<IMongodbCountParams>(params, 1, null, PLATFORM_NAME.MONGODB)
      db.collection(table).find(QQ).count((err, res) => {
        if (err) reject(err)
        client.close()
        resolve({data: res})
      })
    })
  })
}


export default fetchCount