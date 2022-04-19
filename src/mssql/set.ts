/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/set.ts
 */ 

import {runSql} from '../utils/dbMssql'
import {TTable, MysqlSetParams, MysqlSetRes, TSentence} from '../index'
import setTrans from '../utils/setTrans'
import { PLATFORM_NAME } from '../constants/constants'


function fetchSet(table: TTable, params: MysqlSetParams): Promise<MysqlSetRes>
function fetchSet(table: TTable, params: MysqlSetParams, query: TSentence): Promise<string>
function fetchSet(table: TTable, params: MysqlSetParams = {}, query?: TSentence): Promise<MysqlSetRes | string>{
  return new Promise( async (resolve, reject)=>{
    if(!runSql) return null
    let tempSet: any = setTrans<MysqlSetParams>(params, {}, PLATFORM_NAME.MYSQL)
    let sql = `INSERT INTO ${table}(${tempSet.fieldsArr.toString()}) VALUES (${tempSet.valuesArr.toString()}); SELECT SCOPE_IDENTITY() AS insertId;`
    if(query === 'sentence'){
      return resolve(sql)
    }
    const res = await runSql(sql)
    let iid: string | number = ''
    if(res.recordset.length > 0){
      if(res.recordset[0].insertId){
        iid = res.recordset[0].insertId
      }
    }
    resolve({data: {
      insertId: iid
    }})
  })
}


export default fetchSet