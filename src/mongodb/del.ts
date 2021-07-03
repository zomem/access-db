/*
 * @Author: your name
 * @Date: 2020-01-24 11:03:54
 * @LastEditTime: 2020-06-06 08:49:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /minapp-fetch/src/fetch/data/delete.ts
 */
import {mongodbCollection, mongodbId} from '../utils/dbConnect'
import {TTable, IMongodbDeleteRes} from '../index'

function fetchDel(table: TTable, id: string | number): Promise<IMongodbDeleteRes>{
  return new Promise((resolve, reject)=>{
    mongodbCollection((db, client) => {
      db.collection(table).deleteOne({_id: mongodbId(id)}, (err, res) => {
        if(err) reject(err)
        client.close()
        resolve({data: res})
      })
    })
  })
}


export default fetchDel