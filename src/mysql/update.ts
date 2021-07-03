
import {mysqlConnect} from '../utils/dbConnect'
import {isNumber, isJson} from '../utils/utils'
import {IMysqlUpdateParams, TTable, IMysqlUpdateRes, TSentence, IMysqlUpdateKey} from '../index'
import updateTrans from '../utils/updateTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchUpdate(table: TTable, uniKey: string | number | IMysqlUpdateKey, params: IMysqlUpdateParams): Promise<IMysqlUpdateRes>
function fetchUpdate(table: TTable, uniKey: string | number | IMysqlUpdateKey, params: IMysqlUpdateParams, query: TSentence): Promise<string>
function fetchUpdate(table: TTable, uniKey: string | number | IMysqlUpdateKey, params: IMysqlUpdateParams = {}, query?: TSentence): Promise<IMysqlUpdateRes | string>{
  return new Promise((resolve, reject)=>{
    let tempID='id', tempData
    if(isJson(uniKey)){
      for(let p in uniKey as IMysqlUpdateKey){
        tempID=p
        tempData=uniKey[p]
        break
      }
    }else{
      tempData = uniKey
    }
    let updata: any = updateTrans<IMysqlUpdateParams>(params, [], PLATFORM_NAME.MYSQL)
    let sql = `UPDATE ${table} SET ${updata.toString()} WHERE ${tempID} = ${isNumber(tempData) ? tempData : `'${tempData}'`}`
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