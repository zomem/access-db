
import {mysqlConnect} from '../utils/dbMysql'
import {isArray} from '../utils/utils'
import {MysqlUpdatemanyParams, TTable, MysqlUpdatemanyRes, TSentence} from '../index'
import updatemanyTrans from '../utils/updatemanyTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchUpdateMany(table: TTable, key: string[] | string, params: MysqlUpdatemanyParams): Promise<MysqlUpdatemanyRes>
function fetchUpdateMany(table: TTable, key: string[] | string, params: MysqlUpdatemanyParams, query: TSentence): Promise<string>
function fetchUpdateMany(table: TTable, key: string[] | string, params: MysqlUpdatemanyParams = [], query?: TSentence): Promise<MysqlUpdatemanyRes | string>{
  return new Promise((resolve, reject)=>{
    let tempKey
    if(!isArray(key)){
      tempKey = [key]
    }else{
      tempKey = key
    }

    let updata: string = updatemanyTrans<MysqlUpdatemanyParams>(params, {table, tempKey}, PLATFORM_NAME.MYSQL)
    let sql = `UPDATE ${table} JOIN ${updata}`
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


export default fetchUpdateMany



