import {
  PLATFORM_NAME, 
  MONGODB_UPDATE_METHORD,
  MYSQL_UPDATE_METHORD, 
  REDIS_UPDATE_METHORD,
  FASTDB_UPDATE_METHORD,
  REDIS_STRUCTURE
} from '../constants/constants'
import {isArray, changeSqlParam} from './utils'


export default function updateTrans<T>(params: T, query, dbType){

  let result

  //mysql类
  if(dbType === PLATFORM_NAME.MYSQL){
    let operate:string[] = [], 
        tempParams = params as unknown as any[], 
        joinTable = query.table + '_upmj',
        setdata: string[] = []
    for(let i = 0; i < tempParams.length; i++){
      let opone:string[] = []
      for(let p in tempParams[i]){
        opone.push(` ${changeSqlParam(tempParams[i][p])} AS ${p}`)
        if(i === 0){
          if(query.tempKey.indexOf(p) === -1){
            setdata.push(` ${query.table}.${p}=${joinTable}.${p}`)
          }
        }
      }
      operate.push(` SELECT ${opone.toString()} `)
    }
    result = `(${operate.join('UNION')} ) AS ${joinTable} USING(${query.tempKey.toString()}) SET ${setdata.toString()}`
    
  }


  return result
}