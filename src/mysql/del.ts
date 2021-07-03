/*
 * @Author: your name
 * @Date: 2020-01-24 11:03:54
 * @LastEditTime: 2020-06-06 08:49:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /minapp-fetch/src/fetch/data/delete.ts
 */

import {mysqlConnect} from '../utils/dbConnect'
import {isNumber, isJson} from '../utils/utils'
import {TTable, IMysqlDeleteRes, TSentence, IMysqlGetKey} from '../index'

function fetchDel(table: TTable, uniKey: string | number | IMysqlGetKey): Promise<IMysqlDeleteRes>
function fetchDel(table: TTable, uniKey: string | number | IMysqlGetKey, query: TSentence): Promise<string>
function fetchDel(table: TTable, uniKey: string | number | IMysqlGetKey, query?: TSentence): Promise<IMysqlDeleteRes | string>{
  return new Promise((resolve, reject)=>{
    let tempID='id', tempData
    if(isJson(uniKey)){
      for(let p in uniKey as IMysqlGetKey){
        tempID=p
        tempData=uniKey[p]
        break
      }
    }else{
      tempData = uniKey
    }

    let sql = ''
    sql = `DELETE `
    + `FROM ${table} `
    + `WHERE ${tempID} = ${isNumber(tempData) ? tempData : `'${tempData}'`}`
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


export default fetchDel