import {
  PLATFORM_NAME, 
  MONGODB_UPDATE_METHORD,
  MYSQL_UPDATE_METHORD, 
  REDIS_UPDATE_METHORD,
  FASTDB_UPDATE_METHORD,
  REDIS_STRUCTURE
} from '../constants/constants'
import {UPDATE_ERROR, REDIS_DATA_TYPE_ERROR, REDIS_TYPE_NOMETHOD_ERROR, FASTDB_UPDATE_JSON_ERROR} from '../constants/error'
import {cloneDeep, isArray, isJson, changeSqlParam} from './utils'


export default function updateTrans<T>(params: T, query, dbType){

  let result
  //Mongo 类平台
  if(dbType === PLATFORM_NAME.MONGODB){
    let operate = {}
    for(let pa in params){
      let temp: any = {}
      if(!isArray(params[pa])){
        //不是数组，则直接 set
        temp[pa] = params[pa]
        operate = {...operate, "$set": { ...operate['$set'], ...temp}}
        continue
      }
      if(MONGODB_UPDATE_METHORD.indexOf(params[pa][0]) > -1){
        switch(params[pa][0]){
          case 'set':
            temp[pa] = params[pa][1]
            operate = {...operate, "$set": { ...operate['$set'], ...temp}}
            break
          case 'geo':
            let temp2: any = params[pa], tempGeo = {}
            temp2.shift()
            if(temp2.length > 1){
              tempGeo = cloneDeep({
                type: 'Polygon',
                coordinates: [temp2]
              })
            }else{
              tempGeo = cloneDeep({
                type: 'Point',
                coordinates: temp2[0]
              })
            }
            temp[pa] = tempGeo
            operate = {...operate, "$set": { ...operate['$set'], ...temp}}
            break
          case 'unset':
            temp[pa] = ''
            operate = {...operate, "$unset": { ...operate['$unset'], ...temp}}
            break
          case 'incr':
            temp[pa] = params[pa][1]
            operate = {...operate, "$inc": { ...operate['$inc'], ...temp}}
            break
          case 'append':
            temp[pa] = {
              "$each": isArray(params[pa][1]) ? params[pa][1] : [params[pa][1]]
            }
            operate = {...operate, "$push": { ...operate['$push'], ...temp}}
            break
          case 'uAppend':
            temp[pa] = {
              "$each": isArray(params[pa][1]) ? params[pa][1] : [params[pa][1]]
            }
            operate = {...operate, "$addToSet": { ...operate['$addToSet'], ...temp}}
            break
          case 'remove':
            temp[pa] = {
              "$in": isArray(params[pa][1]) ? params[pa][1] : [params[pa][1]]
            }
            operate = {...operate, "$pull": { ...operate['$pull'], ...temp}}
            break
          default:
            throw new Error(UPDATE_ERROR)
        }
      }else{
        //直接 set
        temp[pa] = params[pa]
        operate = {...operate, "$set": { ...operate['$set'], ...temp}}
      }
    }
    result = operate
  }

  //mysql类
  if(dbType === PLATFORM_NAME.MYSQL){
    let operate = []
    for(let pa in params){
      if(!isArray(params[pa])){
        //不是数组，则直接 set
        operate.push(`${pa} = ${changeSqlParam(params[pa])}`)
        continue
      }
      if(MYSQL_UPDATE_METHORD.indexOf(params[pa][0]) > -1){
        switch(params[pa][0]){
          case 'set':
            operate.push(`${pa} = ${changeSqlParam(params[pa][1])}`)
            break
          case 'unset':
            operate.push(`${pa} = NULL`)
            break
          case 'incr':
            if(params[pa][1] >= 0){
              operate.push(`${pa} = ${pa} + ${params[pa][1]}`)
            }else{
              operate.push(`${pa} = ${pa} - ${Math.abs(params[pa][1])}`)
            }
            break
          default:
            throw new Error(UPDATE_ERROR)
        }
      }else{
        //直接 set
        operate.push(`${pa} = ${changeSqlParam(params[pa])}`)
      }
    }
    result = operate
  }


  //redis
  if(dbType === PLATFORM_NAME.REDIS){
    let keyValue:any = [], key:any = [], method: string = 'set'
    for(let pa in params){
      let tempValue: any = ''
      if(!isArray(params[pa])){
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
            method = 'set'
            break
          default:
            throw new Error(REDIS_DATA_TYPE_ERROR)
        }
        continue
      }

      if(REDIS_UPDATE_METHORD.indexOf(params[pa][0]) > -1){
        tempValue = params[pa][1]
        switch(query.structure){
          case REDIS_STRUCTURE.string:
            switch(params[pa][0]){
              case 'set':
                if(isJson(params[pa])){
                  tempValue = JSON.stringify(tempValue)
                }else{
                  tempValue = tempValue
                }
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(tempValue)
                method = 'set'
                break
              case 'incr':
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(tempValue)
                method = 'incrby'
                break
              case 'add':
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(tempValue)
                method = 'append'
                break
              case 'range':
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(params[pa][2] || 0) //offset 没有则为0
                keyValue.push(tempValue)
                method = 'setrange'
                break
              case 'expireSec':
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(tempValue)
                method = 'expire'
                break
              case 'expireMillisec':
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(tempValue)
                method = 'pexpire'
                break
              case 'expireAt':
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(tempValue)
                method = 'expireat'
                break
              case 'expireMilliAt':
                key.push(pa)
                keyValue.push(pa)
                keyValue.push(tempValue)
                method = 'pexpireat'
                break
              default:
                throw new Error(query.structure + REDIS_TYPE_NOMETHOD_ERROR + params[pa][0])
            }
            break
          default:
            throw new Error(REDIS_DATA_TYPE_ERROR)
        }
      }else{
        // 当没有给定的方法时，使用默认set
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
            method = 'set'
            break
          default:
            throw new Error(REDIS_DATA_TYPE_ERROR)
        }
      }
    }
    result = {keyValue, key, method}
  }


  //fastdb
  if(dbType === PLATFORM_NAME.FASTDB){

    function operVale(methodValue, oldValue){
      if(!isArray(methodValue)){
        //不是数组，则直接 set
        return methodValue
      }
      
      if(FASTDB_UPDATE_METHORD.indexOf(methodValue[0]) > -1){
        switch(methodValue[0]){
          case 'set':
            return methodValue[1]
          case 'geo':
            let temp2: any = methodValue, tempGeo = {}
            temp2.shift()
            if(temp2.length > 1){
              tempGeo = cloneDeep({
                type: 'Polygon',
                coordinates: [temp2]
              })
            }else{
              tempGeo = cloneDeep({
                type: 'Point',
                coordinates: temp2[0]
              })
            }
            return tempGeo
          case 'unset':
            return null
          case 'incr':
            return  oldValue + methodValue[1]
          case 'append':
            if(isArray(methodValue[1])){
              oldValue = oldValue.concat(methodValue[1])
            }else{
              oldValue.push(methodValue[1])
            }
            return oldValue
          case 'uAppend':
            if(isArray(methodValue[1])){
              for(let c = 0; c < methodValue[1].length; c++){
                if(oldValue.indexOf(methodValue[1][c]) === -1){
                  oldValue.push(methodValue[1][c])
                }
              }
            }else{
              if(oldValue.indexOf(methodValue[1]) === -1){
                oldValue.push(methodValue[1])
              }
            }
            return oldValue
          case 'remove':
            let tempv:any = []
            if(isArray(methodValue[1])){
              for(let a = 0; a < oldValue.length; a++){
                if(methodValue[1].indexOf(oldValue[a]) === -1){
                  tempv.push(oldValue[a])
                }
              }
            }else{
              for(let a = 0; a < oldValue.length; a++){
                if([methodValue[1]].indexOf(oldValue[a]) === -1){
                  tempv.push(oldValue[a])
                }
              }
            }
            return tempv
          default:
            throw new Error(UPDATE_ERROR)
        }
      }else{
        //没有找到对应方法，说明就是数组，直接 set
        return methodValue
      }
    }

    function changeJson(old, pa, methodValue){
      let paList = pa.split('.') // 对参数a.b.c进行数组化
      let tempJ = {...old}
      
      switch (paList.length){
        case 1: 
          tempJ[paList[0]] = operVale(methodValue, old[paList[0]])
          break
        case 2:
          tempJ[paList[0]][paList[1]] = operVale(methodValue, old[paList[0]][paList[1]])
          break
        case 3:
          tempJ[paList[0]][paList[1]][paList[2]] = operVale(methodValue, old[paList[0]][paList[1]][paList[2]])
          break
        case 4:
          tempJ[paList[0]][paList[1]][paList[2]][paList[3]] = operVale(methodValue, old[paList[0]][paList[1]][paList[2]][paList[3]])
          break
        case 5:
          tempJ[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]] = operVale(methodValue, old[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]])
          break
        case 6:
          tempJ[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]] = operVale(methodValue, old[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]])
          break
        case 7:
          tempJ[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]][paList[6]] = operVale(methodValue, old[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]][paList[6]])
          break
        case 8:
          tempJ[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]][paList[6]][paList[7]] = operVale(methodValue, old[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]][paList[6]][paList[7]])
          break
        default:
          throw new Error(FASTDB_UPDATE_JSON_ERROR)
      }
      return tempJ
    }

    let oldJson = query
    for(let pa in params){
      oldJson = changeJson(oldJson, pa, params[pa])
    }
    result = oldJson
  }

  return result
}