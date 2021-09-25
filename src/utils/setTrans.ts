import {PLATFORM_NAME, REDIS_STRUCTURE} from '../constants/constants'
import { UPDATE_ERROR, REDIS_DATA_TYPE_ERROR } from '../constants/error'
import { isArray, isJson, changeSqlParam } from './utils'


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
    let keyValue:any = [], key:any = [], method: string = 'set', ni = 0
    for(let pa in params){
      let tempValue: any = ''
      switch(query.structure){
        case REDIS_STRUCTURE.string:
          if(isJson(params[pa])){
            tempValue = JSON.stringify(params[pa])
          }else{
            tempValue = params[pa]
          }
          key.push(pa)
          keyValue.push(pa)
          keyValue.push(tempValue)
          if(ni > 0){
            method = 'msetnx'
          }else{
            method = 'setnx'
          }
          ni++
          break
        default:
          throw new Error(REDIS_DATA_TYPE_ERROR)
      }
    }
    result = {keyValue, key, method}
  }
  
  return result
}