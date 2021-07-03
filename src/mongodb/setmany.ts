/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/setOneMany.ts
 */ 
import {mongodbCollection} from '../utils/dbConnect'
import {changeSetManyParams, isArray} from '../utils/utils'
import {TTable, IMongodbSetParams} from '../index'
import {SET_MANY_PARAMS_ARR_ERROR} from '../constants/error'


function fetchSetmany(table: TTable, params: IMongodbSetParams[]): Promise<any>{
  if(!isArray(params)) throw new Error(SET_MANY_PARAMS_ARR_ERROR)
  return new Promise((resolve, reject)=>{
    mongodbCollection((db, client) => {
      db.collection(table).insertMany(changeSetManyParams(params), {ordered: false}, (err, res) => {
        if(err) reject(err)
        client.close()
        resolve({data: res})
      })
    })
  })
}

export default fetchSetmany