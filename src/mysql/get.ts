/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:52:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/get.ts
 */ 

import {mysqlConnect} from '../utils/dbConnect'
import {isArray, isNumber, isJson} from '../utils/utils'
import {IMysqlGetRes, TTable, IMysqlGetKey, IMysqlGetQuery, TSentence} from '../index'

function fetchGet(table: TTable, uniKey: string | number | IMysqlGetKey, query?: IMysqlGetQuery): Promise<IMysqlGetRes>
function fetchGet(table: TTable, uniKey: string | number | IMysqlGetKey, query: TSentence): Promise<string>
function fetchGet(table: TTable, uniKey: string | number | IMysqlGetKey, query?: IMysqlGetQuery | TSentence): Promise<IMysqlGetRes | string>{
  let tempQuery = (query === 'sentence' || !query) ? {} : query

  return new Promise((resolve, reject)=>{
    let selectArr = []
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
    + `WHERE ${tempID} = ${isNumber(tempData) ? tempData : `'${tempData}'`}`
    if(query === 'sentence'){
      resolve(sql)
      return
    }
    mysqlConnect(sql, [], (err, results) => {
      if (err) {
        reject({err})
      }
      let jsonStr = JSON.stringify(results || [])
      resolve({data: JSON.parse(jsonStr)[0] || {} })
    })
  })
}

export default fetchGet