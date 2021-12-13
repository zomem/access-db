import { hrtime } from 'process'
import {PLATFORM_NAME} from '../constants/constants'
import { UPDATE_ERROR } from '../constants/error'
import { isArray, isNumber, changeSqlParam } from './utils'
import {strHash} from '../utils/timeHash'


export default function setTrans<T>(params: T, query, dbType){
  //mysql 类平台
  let result
  if(dbType === PLATFORM_NAME.MYSQL){
    let fieldsArr = [], valuesArr = [], valuesQue = []
    for(let pa in params){
      if(!isArray(params[pa])){
        //不是数组
        fieldsArr.push(pa)
        valuesQue.push('?')
        //valuesArr.push(isJson(params[pa]) ? JSON.stringify(params[pa]) : params[pa])
        valuesArr.push(changeSqlParam(params[pa]))
        //continue
      }else{
        throw new Error(UPDATE_ERROR)
      }
      // if(SET_METHORD.indexOf(params[pa][0]) > -1 ){
      //   switch(params[pa][0]){
      //     case 'geo':
      //       let temp2: any = params[pa], tempGeo = ''
      //       temp2.shift()
      //       if(temp2.length > 1){
      //         let tempPs = temp2.map(item => {
      //           return `Point(${item.toString()})`
      //         })
      //         tempGeo = `Polygon(LineString(${tempPs.toString()}))`
      //       }else{
      //         tempGeo=`Point(${temp2[0].toString()})`
      //       }
      //       fieldsArr.push(pa)
      //       valuesQue.push(tempGeo)
      //       break
      //     default:
      //       throw new Error(UPDATE_ERROR)
      //   }
      // }else{
      //   //直接 set
      //   fieldsArr.push(pa)
      //   valuesQue.push('?')
      //   valuesArr.push(isJson(params[pa]) ? JSON.stringify(params[pa]) : params[pa])
      // }

    }
    result = {fieldsArr, valuesQue, valuesArr}
  }

  if(dbType === PLATFORM_NAME.REDIS){
    let table = query, keyData: any = [], tempParams = {...params} as any
    if(!tempParams.id){
      tempParams = {
        id: strHash(),
        ...tempParams
      }
    }else{
      const tempid = tempParams.id
      delete tempParams.id
      tempParams = {
        id: tempid,
        ...tempParams
      }
    }
    for(let p in tempParams){
      keyData.push({
        method: 'SETNX',
        key: table + ':id:key:' + tempParams.id,
        value: `${new Date().getTime()}${hrtime.bigint()}`  //保存更新时间
      })
      keyData.push({
        method: 'HSETNX',
        key: table + ':' + tempParams.id,
        value: [p, `${tempParams[p]}`]
      })
    }
    result = keyData
  }
  
  return result
}