/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/set.ts
 */ 

import {mysqlConnect} from '../utils/dbMysql'
import {TTable, MysqlSetParams, MysqlSetRes, TSentence} from '../index'
import setTrans from '../utils/setTrans'
import { PLATFORM_NAME } from '../constants/constants'


function fetchSet(table: TTable, params: MysqlSetParams): Promise<MysqlSetRes>
function fetchSet(table: TTable, params: MysqlSetParams, query: TSentence): Promise<string>
function fetchSet(table: TTable, params: MysqlSetParams = {}, query?: TSentence): Promise<MysqlSetRes | string>{
  return new Promise((resolve, reject)=>{
    let tempSet: any = setTrans<MysqlSetParams>(params, {}, PLATFORM_NAME.MYSQL)
    let sql = `INSERT INTO ${table}(${tempSet.fieldsArr.toString()}) VALUES (${tempSet.valuesArr.toString()})`
    if(query === 'sentence'){
      return resolve(sql)
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