
import {runSql} from '../utils/dbMssql'
import {isArray} from '../utils/utils'
import {MysqlUpdatemanyParams, TTable, MysqlUpdatemanyRes, TSentence} from '../index'
import updatemanyTrans from '../utils/updatemanyTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchUpdateMany(table: TTable, key: string[] | string, params: MysqlUpdatemanyParams): Promise<MysqlUpdatemanyRes>
function fetchUpdateMany(table: TTable, key: string[] | string, params: MysqlUpdatemanyParams, query: TSentence): Promise<string>
function fetchUpdateMany(table: TTable, key: string[] | string, params: MysqlUpdatemanyParams = [], query?: TSentence): Promise<MysqlUpdatemanyRes | string>{
  return new Promise(async (resolve, reject)=>{
    if(!runSql) return null
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
    
    const res = await runSql(sql)
    resolve({data: {
      changedRows: res.rowsAffected[0] || 0
    }})
  })
}


export default fetchUpdateMany



