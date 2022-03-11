import {
  PLATFORM_NAME,
  MYSQL_UPDATE_METHORD,
} from '../constants/constants'
import {isArray, changeSqlParam, isMongodbObjectId} from './utils'
import {UPDATE_ERROR} from '../constants/error'
import { mongodbId } from './dbMongodb'
import updateTrans from './updateTrans'

export default function updatemanyTrans<T>(params: T, query, dbType){

  let result: any

  if(dbType === PLATFORM_NAME.MONGODB){
    let oldParams = params as any
    let tempParams = JSON.parse(JSON.stringify(oldParams)) // 数组对象的深拷贝
    let bulkList: any = []
    let keys: any = []
    if(isArray(query)){
      keys = query
    }else{
      keys = [query]
    }
    for(let i = 0; i < oldParams.length; i++){
      if(keys.length === 1){
        let querySon: any = {}
        if(keys[0] === '_id'){
          if(isMongodbObjectId(oldParams[i]._id)){
            querySon['_id'] = oldParams[i]._id
          }else{
            querySon['_id'] = mongodbId(oldParams[i]._id)
          }
        }else{
          querySon[`${keys[0]}`] = oldParams[i][keys[0]]
        }
        delete tempParams[i][keys[0]]
        bulkList.push({
          updateMany: {
            filter: querySon,
            update: updateTrans(tempParams[i], {}, PLATFORM_NAME.MONGODB),
          }
        })
      }else{
        let querySon: any = {'$and': []}
        for(let j = 0; j < keys.length; j++){
          if(keys[j] === '_id'){
            if(isMongodbObjectId(oldParams[i]._id)){
              querySon['$and'].push({_id: oldParams[i]._id})
            }else{
              querySon['$and'].push(mongodbId(oldParams[i]._id))
            }
          }else{
            querySon['$and'].push({[`${keys[j]}`]: oldParams[i][keys[j]]})
          }
          delete tempParams[i][keys[j]]
        }
        bulkList.push({
          updateMany: {
            filter: querySon,
            update: updateTrans(tempParams[i], {}, PLATFORM_NAME.MONGODB),
          }
        })
      }
    }

    result = bulkList
  }

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