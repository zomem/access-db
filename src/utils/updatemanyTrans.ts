import {
  PLATFORM_NAME, 
  MONGODB_UPDATE_METHORD,
  MYSQL_UPDATE_METHORD, 
  REDIS_UPDATE_METHORD,
  FASTDB_UPDATE_METHORD,
  REDIS_STRUCTURE
} from '../constants/constants'
import {isArray, changeSqlParam} from './utils'
import {UPDATE_ERROR} from '../constants/error'

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
        if(!isArray(tempParams[i][p])){
          //不是数组，则直接 set
          opone.push(` ${changeSqlParam(tempParams[i][p])} AS ${p}`)
        }else{
          if(MYSQL_UPDATE_METHORD.indexOf(tempParams[i][p][0]) > -1){
            switch(tempParams[i][p][0]){
              case 'set':
                opone.push(` ${changeSqlParam(tempParams[i][p][1])} AS ${p}`)
                break
              case 'unset':
                opone.push(` NULL AS ${p}`)
                break
              case 'incr':
                opone.push(` ${changeSqlParam(tempParams[i][p][1])} AS ${p}`)
                break
              default:
                throw new Error(UPDATE_ERROR)
            }
          }else{
            //直接 set
            opone.push(` ${changeSqlParam(tempParams[i][p])} AS ${p}`)
          }
        }

        
        if(i === 0){
          if(query.tempKey.indexOf(p) === -1){
            if(!isArray(tempParams[i][p])){
              setdata.push(` ${query.table}.${p} = ${joinTable}.${p}`)
            }else{
              if(MYSQL_UPDATE_METHORD.indexOf(tempParams[i][p][0]) > -1){
                switch(tempParams[i][p][0]){
                  case 'set':
                    setdata.push(` ${query.table}.${p} = ${joinTable}.${p}`)
                    break
                  case 'unset':
                    setdata.push(` ${query.table}.${p} = ${joinTable}.${p}`)
                    break
                  case 'incr':
                    setdata.push(` ${query.table}.${p} = ${query.table}.${p} + ${joinTable}.${p}`)
                    break
                  default:
                    throw new Error(UPDATE_ERROR)
                }
              }else{
                //直接 set
                setdata.push(` ${query.table}.${p} = ${joinTable}.${p}`)
              }
            }
          }
        }
      }
      operate.push(` SELECT ${opone.toString()} `)
    }
    result = `(${operate.join('UNION')} ) AS ${joinTable} USING(${query.tempKey.toString()}) SET ${setdata.toString()}`
    
  }


  return result
}