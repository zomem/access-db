
import {mysqlConnect} from '../utils/dbMysql'
import {isJson, changeSqlParam} from '../utils/utils'
import {MysqlUpdateParams, TTable, MysqlUpdateRes, TSentence, MysqlUpdateKey} from '../index'
import updateTrans from '../utils/updateTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchUpdate(table: TTable, uniKey: string | number | MysqlUpdateKey, params: MysqlUpdateParams): Promise<MysqlUpdateRes>
function fetchUpdate(table: TTable, uniKey: string | number | MysqlUpdateKey, params: MysqlUpdateParams, query: TSentence): Promise<string>
function fetchUpdate(table: TTable, uniKey: string | number | MysqlUpdateKey, params: MysqlUpdateParams = {}, query?: TSentence): Promise<MysqlUpdateRes | string>{
  return new Promise((resolve, reject)=>{
    let tempID='id', tempData
    if(isJson(uniKey)){
      for(let p in uniKey as MysqlUpdateKey){
        tempID=p
        tempData=uniKey[p]
        break
      }
    }else{
      tempData = uniKey
    }
    let updata: any = updateTrans<MysqlUpdateParams>(params, [], PLATFORM_NAME.MYSQL)
    let sql = `UPDATE ${table} SET ${updata.toString()} WHERE ${tempID} = ${changeSqlParam(tempData)}`
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


export default fetchUpdate