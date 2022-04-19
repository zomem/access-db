/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:52:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/get.ts
 */

import {runSql} from '../utils/dbMssql'
import {isArray, changeSqlParam, isJson} from '../utils/utils'
import {MysqlGetRes, TTable, MysqlGetKey, MysqlGetQuery, TSentence} from '../index'

function fetchGet(table: TTable, uniKey: string | number | MysqlGetKey, query?: MysqlGetQuery): Promise<MysqlGetRes>
function fetchGet(table: TTable, uniKey: string | number | MysqlGetKey, query?: MysqlGetQuery | TSentence, queryt?: TSentence): Promise<string>
function fetchGet(table: TTable, uniKey: string | number | MysqlGetKey, query?: MysqlGetQuery | TSentence, queryt?: TSentence): Promise<MysqlGetRes | string>{
  let tempQuery: MysqlGetQuery = (!query ? {} : query) as MysqlGetQuery
  let tempSen = query === 'sentence' ? 'sentence' : ''

  return new Promise( async (resolve, reject)=>{
    if(!runSql) return null
    let selectArr = []
    let tempID='id', tempData
    if(isJson(uniKey)){
      for(let p in uniKey as MysqlGetKey){
        tempID=p
        tempData=uniKey[p]
        break
      }
    }else{
      tempData = uniKey
    }
    if(tempQuery.select){
      if (isArray(tempQuery.select)){
        let tempPa = tempQuery.select as string[]
        selectArr = tempPa.length > 0 ? tempPa : ['*']
      }else{
        let tempPa2 = tempQuery.select as string
        selectArr = [tempPa2]
      }
    }else{
      selectArr = ['*']
    }

    let sql = ''
    sql = `SELECT ${selectArr.length > 0 ? selectArr.toString() + ' ' : '* '}`
    + `FROM ${table} `
    + `WHERE ${tempID} = ${changeSqlParam(tempData)}`
    if(queryt === 'sentence' || tempSen === 'sentence'){
      return resolve(sql)
    }
    const res = await runSql(sql)
    resolve({data: res.recordset[0] || {}})
  })
}

export default fetchGet