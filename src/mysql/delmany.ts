import {mysqlConnect} from '../utils/dbMysql'
import {changeSqlParam, isArray, isJson} from '../utils/utils'
import {TTable, MysqlDeleteRes, TSentence, MysqlGetKey} from '../index'
import {PARAMS_EMPTY_ARR_ERROR, PARAMS_NOT_ARR_ERROR} from '../constants/error'

function fetchDelmany(table: TTable, uniKeys: string[] | number[] | MysqlGetKey[]): Promise<MysqlDeleteRes>
function fetchDelmany(table: TTable, uniKeys: string[] | number[] | MysqlGetKey[], query: TSentence): Promise<string>
function fetchDelmany(table: TTable, uniKeys: string[] | number[] | MysqlGetKey[], query?: TSentence): Promise<MysqlDeleteRes | string>{
  return new Promise((resolve, reject)=>{
    let tempID='id', tempData: any[] = []
    if(!isArray(uniKeys)) throw new Error(PARAMS_NOT_ARR_ERROR)
    if(uniKeys.length === 0) throw new Error(PARAMS_EMPTY_ARR_ERROR)
    for(let i = 0; i < uniKeys.length; i++){
      let uniKey = uniKeys[i]
      if(isJson(uniKey)){
        for(let p in uniKey as MysqlGetKey){
          if(i === 0) tempID=p
          tempData.push(changeSqlParam(uniKey[p]))
          break
        }
      }else{
        tempData.push(changeSqlParam(uniKey))
      }
    }

    let sql = ''
    sql = `DELETE `
    + `FROM ${table} `
    + `WHERE ${tempID} IN (${tempData.toString()})`

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


export default fetchDelmany