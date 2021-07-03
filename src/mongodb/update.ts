/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:58:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/update.ts
 */ 
import {mongodbCollection, mongodbId} from '../utils/dbConnect'
import {IMongodbUpdateParams, TTable, IMongodbUpdateRes} from '../index'
import updateTrans from '../utils/updateTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchUpdate(table: TTable, id: string | number, params: IMongodbUpdateParams): Promise<IMongodbUpdateRes>{
  return new Promise((resolve, reject)=>{
    mongodbCollection((db, client) => {
      let records = updateTrans<IMongodbUpdateParams>(params, {}, PLATFORM_NAME.MONGODB)
      db.collection(table).updateOne({_id: mongodbId(id)}, records, function(err, res) {
        if (err) reject(err)
        client.close()
        resolve({data: res})
      })
    })
  })
}


export default fetchUpdate