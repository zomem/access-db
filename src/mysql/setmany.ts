/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:57:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@ownpack/weapp/src/fetch/data/setOneMany.ts
 */ 
import {mysqlConnect} from '../utils/dbConnect'
import {isArray} from '../utils/utils'
import {TTable, IMysqlSetParams, TSentence} from '../index'
import {SET_MANY_PARAMS_ARR_ERROR} from '../constants/error'
import setTrans from '../utils/setTrans'
import { PLATFORM_NAME } from '../constants/constants'


function fetchSetmany(table: TTable, params: IMysqlSetParams[]): Promise<any>
function fetchSetmany(table: TTable, params: IMysqlSetParams[], query: TSentence): Promise<string>
function fetchSetmany(table: TTable, params: IMysqlSetParams[], query?: TSentence): Promise<any | string>{
  if(!isArray(params)) throw new Error(SET_MANY_PARAMS_ARR_ERROR)

  return new Promise((resolve, reject)=>{
    let fields = []
    let values = []
    for(let i = 0; i < params.length; i++){
      let tempSet: any = setTrans(params[i], {}, PLATFORM_NAME.MYSQL)
      if(i === 0) fields = tempSet.fieldsArr
      values.push(`(${tempSet.valuesArr.toString()})`)
    }

    let sql = `INSERT INTO ${table}(${fields.toString()}) VALUES ${values.toString()}`
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

export default fetchSetmany