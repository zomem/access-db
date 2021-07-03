/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/set.ts
 */ 
import {mongodbCollection} from '../utils/dbConnect'
import {changeSetParams} from '../utils/utils'
import {TTable, IMongodbSetParams, IMongodbSetRes} from '../index'


function fetchSet(table: TTable, params: IMongodbSetParams): Promise<IMongodbSetRes>{
  return new Promise((resolve, reject)=>{
    mongodbCollection((db, client) => {
      db.collection(table).insertOne(changeSetParams(params), (err, res) => {
        if(err) reject(err)
        client.close()
        resolve({data: res})
      })
    })
  })
}


export default fetchSet