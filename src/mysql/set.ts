/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/set.ts
 */ 

import {mysqlConnect} from '../utils/dbConnect'
import {TTable, IMysqlSetParams, IMysqlSetRes, TSentence} from '../index'
import setTrans from '../utils/setTrans'
import { PLATFORM_NAME } from '../constants/constants'


function fetchSet(table: TTable, params: IMysqlSetParams): Promise<IMysqlSetRes>
function fetchSet(table: TTable, params: IMysqlSetParams, query: TSentence): Promise<string>
function fetchSet(table: TTable, params: IMysqlSetParams = {}, query?: TSentence): Promise<IMysqlSetRes | string>{
  return new Promise((resolve, reject)=>{
    let tempSet: any = setTrans<IMysqlSetParams>(params, {}, PLATFORM_NAME.MYSQL)
    let sql = `INSERT INTO ${table}(${tempSet.fieldsArr.toString()}) VALUES (${tempSet.valuesArr.toString()})`
    if(query === 'sentence'){
      resolve(sql)
      return
    }
    mysqlConnect(sql, [], (err, results) => {
      if (err) {
        reject({err})
      }
      let jsonStr = JSON.stringify(results || {})
      resolve({data: JSON.parse(jsonStr)})
    })
  })
}


export default fetchSet