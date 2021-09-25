import {PLATFORM_NAME, J_NAME_LIST} from '../constants/constants'
import {FIND_CHECKR_ERROR, FIND_P_ERROR, FIND_P_BETWEEN_ERROR, FIND_NO_PJ_ERROR} from '../constants/error'
import {changeFindGeoJson, isArray, changeSqlParam, isMongodbObjectId} from './utils'

export default function findTrans<T>(params: T, r_num: number, query_data, dbType){
  let rstring = `r${r_num === 1 ? '' : r_num}`
  if(!params[rstring]){
    return 2  //返回所有数据
  }
  let r = params[rstring].replace(/\s+/g,'')       //去掉空格
  let query: any  = {}

  let checkR = r.replace(/[^\(\)]/g, '')
  while(/\(\)/g.test(checkR)){
    checkR = checkR.replace(/\(\)/g, '')
  }
  //是否有多的括号，(
  if(checkR){
    throw new Error('"' + checkR + '": ' + FIND_CHECKR_ERROR)
  }

  let stack = []   //栈
  let topBrackets: string = ''     //最近的一个括号里的内容
  let stackTop: string | undefined = ''     //栈顶的内容
  let list = r.replace(/(\()|(\))/g, '#$1$2#').split(/#/g)

  //1.将所有p转换成query类型
  let ps = r.replace(/\(|\)/g, '').split(/&&|\|\|/g)

  //Mongo 
  if(dbType === PLATFORM_NAME.MONGODB){
    for(let i = 0; i < ps.length; i++){
      query[ps[i]] = {}
      if(!params[ps[i]]) throw new Error(FIND_NO_PJ_ERROR + ps[i])
      //如果是_id，则要对数据进行转换
      if(params[ps[i]][0] === '_id'){
        const {mongodbId} = require('../utils/dbMongodb')
        if(isArray(params[ps[i]][2])){
          params[ps[i]][2] = params[ps[i]][2].map(item => {
            let tempId
            if(isMongodbObjectId(item)){
              tempId = item
            }else{
              tempId = mongodbId(item)
            }
            return tempId
          })
        }else{
          if(!isMongodbObjectId(params[ps[i]][2])){
            params[ps[i]][2] = mongodbId(params[ps[i]][2])
          }
        }
      }
      switch(params[ps[i]][1]){
        case '=':
          query[ps[i]][params[ps[i]][0]] = {"$eq": params[ps[i]][2]}
          break
        case '!=':
          query[ps[i]][params[ps[i]][0]] = {"$ne": params[ps[i]][2]}
          break
        case '<':
          query[ps[i]][params[ps[i]][0]] = {"$lt": params[ps[i]][2]}
          break
        case '<=':
          query[ps[i]][params[ps[i]][0]] = {"$lte": params[ps[i]][2]}
          break
        case '>':
          query[ps[i]][params[ps[i]][0]] = {"$gt": params[ps[i]][2]}
          break
        case '>=':
          query[ps[i]][params[ps[i]][0]] = {"$gte": params[ps[i]][2]}
          break
        case 'in':
          let tm1 = {}, tm2 = {}
          tm1[params[ps[i]][0]] = {"$elemMatch": {"$in": params[ps[i]][2]}}
          tm2[params[ps[i]][0]] = {"$in": params[ps[i]][2]}
          query[ps[i]] = {
            "$or": [tm1, tm2]
          }
          break
        case 'notIn':
          query[ps[i]][params[ps[i]][0]] = {"$nin": params[ps[i]][2]}
          break
        case 'arrContain':
          query[ps[i]][params[ps[i]][0]] = {"$all": params[ps[i]][2]}
          break
        case 'regex':
          query[ps[i]][params[ps[i]][0]] = {"$regex": params[ps[i]][2]}
          break
        case 'strLength':
          let reg: any
          if(params[ps[i]].length > 3){
            reg = new RegExp(`^.{${params[ps[i]][2]},${params[ps[i]][3]}}$`)
          }else{
            reg = new RegExp(`^.{${params[ps[i]][2]}}$`)
          }
          query[ps[i]][params[ps[i]][0]] = {"$regex": reg}
          break
        case 'geoInclude':
          query[ps[i]][params[ps[i]][0]] = {
            "$geoIntersects": {
              "$geometry": changeFindGeoJson(params[ps[i]])
            }
          }
          break
        case 'geoWithinCircle':
          query[ps[i]][params[ps[i]][0]] = {
            "$geoWithin": {
              "$center": [[params[ps[i]][2][0], params[ps[i]][2][1]], (params[ps[i]][3] || 1) / 6378.1]
            }
          }
          break
        case 'geoWithinRegion':
          query[ps[i]][params[ps[i]][0]] = {
            "$nearSphere": {
              "$geometry": changeFindGeoJson(params[ps[i]]),
              "$minDistance": params[ps[i]][4] || 0,
              "$maxDistance": params[ps[i]][3],
            }
          }
          break
        case 'geoWithin':
          query[ps[i]][params[ps[i]][0]] = {
            "$geoWithin": {
              "$geometry": changeFindGeoJson(params[ps[i]])
            }
          }
          break
        case 'isExists':
          query[ps[i]][params[ps[i]][0]] = {"$exists": params[ps[i]][2]}
          break
        case 'type':
          query[ps[i]][params[ps[i]][0]] = {"$type": params[ps[i]][2]}
          break
        default:
          throw new Error(FIND_P_ERROR)
      }
    }
  }
  //mysql 
  if(dbType === PLATFORM_NAME.MYSQL){
    for(let i = 0; i < ps.length; i++){
      query[ps[i]] = {}
      let tableName = '', fieldName = '', tempSelect = ''
      if(!params[ps[i]]) throw new Error(FIND_NO_PJ_ERROR + ps[i])
      if(params[ps[i]][0].toString().indexOf('SELECT') > -1){
        tempSelect = `(${params[ps[i]][0]})`
      }else{
        let tempT = params[ps[i]][0].split('.')
        if(tempT.length === 1){
          tableName = query_data.tableMain
          fieldName = params[ps[i]][0]
        }else{
          tableName = tempT[0]
          fieldName = tempT[1]
        }
      }
      
      let tempParam = ''
      if(isArray(params[ps[i]][2])){
        let tempArr = []
        for(let j = 0; j < params[ps[i]][2].length; j++){
          tempArr.push(changeSqlParam(params[ps[i]][2][j]))
        }
        tempParam = `(${tempArr.toString()})`
      }else{
        if(params[ps[i]][2].toString().indexOf('SELECT') > -1){
          tempParam = `(${params[ps[i]][2]})`
        }else if(params[ps[i]][1] === 'regex'){
          let tempReg = params[ps[i]][2].toString()
          if(tempReg[0] === '/'){
            tempParam = `'${tempReg.replace(/^\//ig, '').replace(/(\/|\/i|\/g|\/ig|\/gi|\/m)$/ig, '').replace(/\\/ig, '\\\\')}'`
          }else{
            tempParam = `'${tempReg}'`
          }
        }else if(params[ps[i]][2].toString().indexOf('.') > -1){
          let tempPl = params[ps[i]][2].split('.')
          if(query_data.table.indexOf(tempPl[0]) > -1){
            tempParam = `${query_data.tableHash[tempPl[0]]}.${tempPl[1]}`
          }else{
            tempParam = `'${params[ps[i]][2]}'`
          }
        }else{
          tempParam = changeSqlParam(params[ps[i]][2])
        }
      }

      let tempParam2 = ''
      if(params[ps[i]][3]){
        if(params[ps[i]][3].toString().indexOf('SELECT') > -1){
          tempParam2 = `(${params[ps[i]][3]})`
        }else if(params[ps[i]][3].toString().indexOf('.') > -1){
          let tempPl = params[ps[i]][3].split('.')
          if(query_data.table.indexOf(tempPl[0]) > -1){
            tempParam2 = `${query_data.tableHash[tempPl[0]]}.${tempPl[1]}`
          }else{
            tempParam2 = `'${params[ps[i]][3]}'`
          }
        }else{
          tempParam2 = changeSqlParam(params[ps[i]][3])
        }
      }

      switch(params[ps[i]][1]){
        case '=':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} = ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} = ${tempParam}`
          }
          break
        case '!=':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} != ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} != ${tempParam}`
          }
          break
        case '<':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} < ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} < ${tempParam}`
          }
          break
        case '<=':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} <= ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} <= ${tempParam}`
          }
          break
        case '>':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} > ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} > ${tempParam}`
          }
          break
        case '>=':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} >= ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} >= ${tempParam}`
          }
          break
        case 'between':
          if(params[ps[i]].length > 3){
            if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
              if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
              query[ps[i]] = `${query_data.jObj[fieldName]} BETWEEN ${tempParam} AND ${tempParam2}`
            }else{
              query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} BETWEEN ${tempParam} AND ${tempParam2}`
            }
          }else{
            throw new Error(FIND_P_BETWEEN_ERROR)
          }
          break
        case 'notBetween':
          if(params[ps[i]].length > 3){
            if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
              if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
              query[ps[i]] = `${query_data.jObj[fieldName]} NOT BETWEEN ${tempParam} AND ${tempParam2}`
            }else{
              query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} NOT BETWEEN ${tempParam} AND ${tempParam2}`
            }
          }else{
            throw new Error(FIND_P_BETWEEN_ERROR)
          }
          break
        case 'like':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} LIKE ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} LIKE ${tempParam}`
          }
          break
        case 'regex':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} REGEXP ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} REGEXP ${tempParam}`
          }
          break
        case 'strLength':
          let reg: any
          if(params[ps[i]].length > 3){
            reg = new RegExp(`^.${params[ps[i]][2]},${params[ps[i]][3]}}$`)
          }else{
            reg = new RegExp(`^.{${params[ps[i]][2]}}$`)
          }
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} REGEXP ${reg}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} REGEXP ${reg}`
          }
          break
        case 'in':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} IN ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} IN ${tempParam}`
          }
          break
        case 'notIn':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} NOT IN ${tempParam}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} NOT IN ${tempParam}`
          }
          break
        case 'isNull':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            query[ps[i]] = `${query_data.jObj[fieldName]} is ${tempParam === 'true' ? 'NULL' : 'NOT NULL'}`
          }else{
            query[ps[i]] = `${query_data.tableHash[tableName]}.${fieldName} is ${tempParam === 'true' ? 'NULL' : 'NOT NULL'}`
          }
          break
        case 'isExists':
          if(r_num === 2 && J_NAME_LIST.indexOf(fieldName) > -1){
            if(!params[fieldName]) throw new Error(FIND_NO_PJ_ERROR + fieldName)
            if(tempParam === 'true'){
              query[ps[i]] = `EXISTS ${tempSelect ? tempSelect : query_data.jObj[fieldName]}`
            }else{
              query[ps[i]] = `NOT EXISTS ${tempSelect ? tempSelect : query_data.jObj[fieldName]}`
            }
          }else{
            if(tempParam === 'true'){
              query[ps[i]] = `EXISTS ${tempSelect ? tempSelect : query_data.tableHash[tableName][fieldName]}`
            }else{
              query[ps[i]] = `NOT EXISTS ${tempSelect ? tempSelect : query_data.tableHash[tableName][fieldName]}`
            }
          }
          break
        default:
          throw new Error(FIND_P_ERROR)
      }
    }
  }
  //fastdb
  if(dbType === PLATFORM_NAME.FASTDB){
    for(let i = 0; i < ps.length; i++){
      query[ps[i]] = false  // 每一个p，是否通过
      if(!params[ps[i]]) throw new Error(FIND_NO_PJ_ERROR + ps[i])
      let paList = params[ps[i]][0].split('.'), qdata=null
      try{
        switch (paList.length){
          case 1: 
            qdata = query_data[paList[0]]
            break
          case 2:
            qdata = query_data[paList[0]][paList[1]]
            break
          case 3:
            qdata = query_data[paList[0]][paList[1]][paList[2]]
            break
          case 4:
            qdata = query_data[paList[0]][paList[1]][paList[2]][paList[3]]
            break
          case 5:
            qdata = query_data[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]]
            break
          case 6:
            qdata = query_data[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]]
            break
          case 7:
            qdata = query_data[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]][paList[6]]
            break
          case 8:
            qdata = query_data[paList[0]][paList[1]][paList[2]][paList[3]][paList[4]][paList[5]][paList[6]][paList[7]]
            break
          default:
            qdata = query_data[paList[0]]
        }
      }catch(err){
        qdata = null
        continue
      }
      

      switch(params[ps[i]][1]){
        case '=':
          if(qdata === params[ps[i]][2]){
            query[ps[i]] = true
          }
          break
        case '!=':
          if(qdata != params[ps[i]][2]){
            query[ps[i]] = true
          }
          break
        case '<':
          if(qdata < params[ps[i]][2]){
            query[ps[i]] = true
          }
          break
        case '<=':
          if(qdata<= params[ps[i]][2]){
            query[ps[i]] = true
          }
          break
        case '>':
          if(qdata > params[ps[i]][2]){
            query[ps[i]] = true
          }
          break
        case '>=':
          if(qdata >= params[ps[i]][2]){
            query[ps[i]] = true
          }
          break
        case 'in':
          let tempIn = qdata
          if(isArray(tempIn)){
            for(let a = 0; a < tempIn.length; a++){
              if(params[ps[i]][2].indexOf(tempIn[a]) > -1){
                query[ps[i]] = true
                break
              }
            }
          }else{
            if(params[ps[i]][2].indexOf(tempIn) > -1){
              query[ps[i]] = true
            }
          }
          break
        case 'notIn':
          let tempNotIn = qdata
          if(isArray(tempNotIn)){
            for(let b = 0; b < tempIn.length; b++){
              if(!(params[ps[i]][2].indexOf(tempNotIn[b]) > -1)){
                query[ps[i]] = true
              }else{
                query[ps[i]] = false
                break
              }
            }
          }else{
            if(!(params[ps[i]][2].indexOf(tempNotIn) > -1)){
              query[ps[i]] = true
            }
          }
          break
        case 'arrContain':
          let tempArrCon = qdata
          if(isArray(tempArrCon)){
            for(let c = 0; c < params[ps[i]][2].length; c++){
              if(tempArrCon.indexOf(params[ps[i]][2][c]) > -1){
                query[ps[i]] = true
              }else{
                query[ps[i]] = false
                break
              }
            }
          }
          break
        case 'regex':
          if(params[ps[i]][2].test(qdata)){
            query[ps[i]] = true
          }
          break
        case 'strLength':
          if(params[ps[i]].length > 3){
            if(
              (qdata.length >= params[ps[i]][2])
              &&
              (qdata.length <= params[ps[i]][3])
            ){
              query[ps[i]] = true
            }
          }else{
            if(qdata.length === params[ps[i]][2]){
              query[ps[i]] = true
            }
          }
          break
        case 'isExists':
          if(qdata){
            if(params[ps[i]][2]){
              query[ps[i]] = true
            }
          }else{
            if(!params[ps[i]][2]){
              query[ps[i]] = true
            }
          }
          break
        default:
          throw new Error(FIND_P_ERROR)
      }
    }
  }


  for(let i = 0; i < list.length; i++){
    if(list[i] === ')'){
      //出栈
      stackTop = stack.pop()
      while (stackTop !== '(') {
        topBrackets = stackTop + topBrackets
        stackTop = stack.pop()
      }
      //进行and,or
      let tempArr = topBrackets.replace(/(&&)|(\|\|)/g, '#$1$2#').split(/#/g)
      // [p9, &&, p8, ||, p32]
      let tempQQ = query[tempArr[0]], n = 0

      //Mongo 类平台
      if(dbType === PLATFORM_NAME.MONGODB){
        while(n < tempArr.length - 1){
          if(tempArr[n+1] === '&&'){
            tempQQ = {
              "$and": [tempQQ, query[tempArr[n+2]]]
            }
          }
          if(tempArr[n+1] === '||'){
            tempQQ = {
              "$or": [tempQQ, query[tempArr[n+2]]]
            }
          }
          n += 2
        }
      }

      //mysql 类平台
      if(dbType === PLATFORM_NAME.MYSQL){
        while (n < tempArr.length - 1) {
          if (tempArr[n + 1] === '&&') {
            tempQQ = `(${tempQQ} AND ${query[tempArr[n + 2]]})`
          }
          if (tempArr[n + 1] === '||') {
            tempQQ = `(${tempQQ} OR ${query[tempArr[n + 2]]})`
          }
          n += 2;
        }
      }

      // fastdb
      if(dbType === PLATFORM_NAME.FASTDB){
        while(n < tempArr.length - 1){
          if(tempArr[n+1] === '&&'){
            if(tempQQ && query[tempArr[n+2]]){
              tempQQ = true
            }else{
              tempQQ = false
            }
          }
          if(tempArr[n+1] === '||'){
            if(tempQQ || query[tempArr[n+2]]){
              tempQQ = true
            }else{
              tempQQ = false
            }
          }
          n += 2
        }
      }

      query[`pp${i}`] = tempQQ
      topBrackets = `pp${i}`
      stack.push(topBrackets)
      topBrackets = ''
      continue
    }else{
      //入栈
      stack.push(list[i])
    }
  }
  let tempArr2 = stack.toString().replace(/,/g, '').replace(/(&&)|(\|\|)/g, '#$1$2#').split(/#/g)
  // [p9, &&, pp8, ||, p32]
  let QQ = query[tempArr2[0]], n = 0

  //Mongo 类平台
  if(dbType === PLATFORM_NAME.MONGODB){
    while(n < tempArr2.length - 1){
      if(tempArr2[n+1] === '&&'){
        QQ = {
          "$and": [QQ, query[tempArr2[n+2]]]
        }
      }
      if(tempArr2[n+1] === '||'){
        QQ = {
          "$or": [QQ, query[tempArr2[n+2]]]
        }
      }
      n += 2
    }
  }

  //mysql 类平台
  if(dbType === PLATFORM_NAME.MYSQL){
    while (n < tempArr2.length - 1) {
      if (tempArr2[n + 1] === '&&') {
        QQ = `(${QQ} AND ${query[tempArr2[n + 2]]})`
      }
      if (tempArr2[n + 1] === '||') {
        QQ = `(${QQ} OR ${query[tempArr2[n + 2]]})`
      }
      n += 2;
    }
  }

  // fastdb
  if(dbType === PLATFORM_NAME.FASTDB){
    while(n < tempArr2.length - 1){
      if(tempArr2[n+1] === '&&'){
        if(QQ && query[tempArr2[n+2]]){
          QQ = true
        }else{
          QQ = false
        }
      }
      if(tempArr2[n+1] === '||'){
        if(QQ || query[tempArr2[n+2]]){
          QQ = true
        }else{
          QQ = false
        }
      }
      n += 2
    }
  }

  return QQ

}