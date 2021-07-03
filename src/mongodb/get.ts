/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:52:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/get.ts
 */ 
import {mongodbCollection, mongodbId} from '../utils/dbConnect'
import {IMongodbGetRes, TTable} from '../index'


function fetchGet(table: TTable, id: string | number): Promise<IMongodbGetRes>{
  return new Promise((resolve, reject)=>{
    mongodbCollection((db, client) => {
      db.collection(table).findOne({_id: mongodbId(id)}, (err, res) => {
        if(err) reject(err)
        client.close()
        resolve({data: res})
      })
    })
  })
}

export default fetchGet