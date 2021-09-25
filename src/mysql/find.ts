import {mysqlConnect} from '../utils/dbMysql'
import {J_MAX, J_NAME_LIST, PLATFORM_NAME} from '../constants/constants'
import {PARAM_TABLE_ERROR, FIND_J_JOIN_ERROR, FIND_NO_PJ_ERROR} from '../constants/error'
import {TTable, MysqlCheckParams, MysqlFindRes, TSentence} from '../index'
import findTrans from '../utils/findTrans'
import timeHash from '../utils/timeHash'


function fetchFind(table: TTable, params: MysqlCheckParams): Promise<MysqlFindRes>
function fetchFind(table: TTable, params: MysqlCheckParams, query: TSentence): Promise<string>
function fetchFind(table: TTable, params: MysqlCheckParams = {}, query?: TSentence): Promise<MysqlFindRes | string>{
  if(!table) throw new Error(PARAM_TABLE_ERROR)
  return new Promise((resolve, reject)=>{
    let tableList = table.toString().replace(/\s*/g, '').split(',')
    let tableHash = {}, tableMain = tableList[0]
    let joinList = [], 
        joinJnameList = [], // 所有j*名字
        joinJ = [],   // 所有j
        joinJObj = {} //对应joinList的j*: name名字
    for(let j = 0; j < J_MAX; j++){
      if(params[`j${j}`]){
        let t1 = params[`j${j}`][0].split('.')
        let t2 = params[`j${j}`][2] ? params[`j${j}`][2].split('.') : ''
        if(t1.length === 1){
          t1[0] = tableMain
        }
        if(t2.length === 1){
          t2[0] = tableMain
        }
        if(t1[0] === t2[0]){
          t2[0] = `j${j}` + t2[0] // 1，2名字相同，则重命名
        }
        let index = joinList.indexOf(t2[0])
        if(index > -1){
          t2[0] = `j${j}` + t2[0] // 2，2名字相同，则重命名
          joinList[index] = joinJnameList[index]   //同时将之前的怀重新命名
          joinJObj[joinJ[index]] = joinJnameList[index] //同时将之前的怀重新命名
        }
        if(tableList.indexOf(t1[0]) === -1 && tableMain !== t1[0]){
          tableList.push(t1[0])
        }
        if(['inner', 'left', 'right', 'full'].indexOf(params[`j${j}`][1]) > -1){
          if(t2[0] === `j${j}`) throw new Error(FIND_J_JOIN_ERROR)
          if(joinList.indexOf(t2[0]) === -1 && tableMain !== t2[0]){
            joinList.push(t2[0])
            joinJObj[`j${j}`] = t2[0]
            joinJ.push(`j${j}`)
            joinJnameList.push(`j${j}` + t2[0])
          }
        }
      }
    }

    let alltable = [...tableList, ...joinList]  //使用到的table，都要列出来
    let des = []
    for(let i = 0; i < alltable.length; i++){
      if(!tableHash[alltable[i]]){
        if(tableList.indexOf(alltable[i]) > -1){
          let tempHash = timeHash()
          tableHash[alltable[i]] = tempHash
          if(joinList.indexOf(alltable[i]) === -1){
            des.push(`${alltable[i]} AS ${tempHash}`)
          }
        }else{
          tableHash[alltable[i]] = alltable[i]
        }
      }
    }

    let joinDes = '', jObj = {}, jTable = {}, jUniqueTable = [], jNum=0

    
    for(let j = 0; j < J_MAX; j++){
      if(params[`j${j}`]){
        let t1 = params[`j${j}`][0].split('.')
        if(t1.length === 1){
          t1.push(t1[0])
          t1[0] = tableMain
        }
        let t2 = ['']
        if(params[`j${j}`][2]){
          if(params[`j${j}`][2].indexOf('SELECT') > -1){
            t2 = [`(${params[`j${j}`][2]})`]
          }else{
            t2 = params[`j${j}`][2].split('.')
          }
        }
        switch(params[`j${j}`][1]) {
          case 'uniqueTable': 
            jUniqueTable.push(params[`j${j}`][0])
            break
          case 'tableOf':
            jTable[`${params[`j${j}`][0]}`] = t2[0]
            break
          case 'inner':
            if(t2.length === 1){
              t2.push(t2[0])
              t2[0] = tableMain
            }
            joinDes = joinDes + ` INNER JOIN ${t2[0]} AS ${tableHash[joinJObj[`j${j}`]]} ON ${tableHash[t1[0]]}.${t1[1]} = ${tableHash[joinJObj[`j${j}`]]}.${t2[1]}`
            break
          case 'left':
            if(t2.length === 1){
              t2.push(t2[0])
              t2[0] = tableMain
            }
            joinDes = joinDes + ` LEFT JOIN ${t2[0]} AS ${tableHash[joinJObj[`j${j}`]]} ON ${tableHash[t1[0]]}.${t1[1]} = ${tableHash[joinJObj[`j${j}`]]}.${t2[1]}`
            break
          case 'right':
            if(t2.length === 1){
              t2.push(t2[0])
              t2[0] = tableMain
            }
            joinDes = joinDes + ` RIGHT JOIN ${t2[0]} AS ${tableHash[joinJObj[`j${j}`]]} ON ${tableHash[t1[0]]}.${t1[1]} = ${tableHash[joinJObj[`j${j}`]]}.${t2[1]}`
            break
          case 'full':
            if(t2.length === 1){
              t2.push(t2[0])
              t2[0] = tableMain
            }
            joinDes = joinDes + ` FULL JOIN ${t2[0]} AS ${tableHash[joinJObj[`j${j}`]]} ON ${tableHash[t1[0]]}.${t1[1]} = ${tableHash[joinJObj[`j${j}`]]}.${t2[1]}`
            break
          case 'count':
            if(params[`j${j}`][2] === 'distinct'){
              jObj[`j${j}`] = t1[1] === '*' ? `COUNT(DISTINCT ${t1[1]})` : `COUNT(DISTINCT ${tableHash[t1[0]]}.${t1[1]})`
            }else{
              jObj[`j${j}`] = t1[1] === '*' ? `COUNT(${t1[1]})` : `COUNT(${tableHash[t1[0]]}.${t1[1]})`
            }
            break
          case 'sum':
            if(params[`j${j}`][2] === 'distinct'){
              jObj[`j${j}`] = `SUM(DISTINCT ${tableHash[t1[0]]}.${t1[1]})`
            }else{
              jObj[`j${j}`] = `SUM(${tableHash[t1[0]]}.${t1[1]})`
            }
            break
          case 'max':
            if(params[`j${j}`][2] === 'distinct'){
              jObj[`j${j}`] = `MAX(DISTINCT ${tableHash[t1[0]]}.${t1[1]})`
            }else{
              jObj[`j${j}`] = `MAX(${tableHash[t1[0]]}.${t1[1]})`
            }
            break
          case 'min':
            if(params[`j${j}`][2] === 'distinct'){
              jObj[`j${j}`] = `MIN(DISTINCT ${tableHash[t1[0]]}.${t1[1]})`
            }else{
              jObj[`j${j}`] = `MIN(${tableHash[t1[0]]}.${t1[1]})`
            }
            break
          case 'avg':
            if(params[`j${j}`][2] === 'distinct'){
              jObj[`j${j}`] = `AVG(DISTINCT ${tableHash[t1[0]]}.${t1[1]})`
            }else{
              jObj[`j${j}`] = `AVG(${tableHash[t1[0]]}.${t1[1]})`
            }
            break
          case 'ucase':
            jObj[`j${j}`] = `UCASE(${tableHash[t1[0]]}.${t1[1]})`
            break
          case 'lcase':
            jObj[`j${j}`] = `LCASE(${tableHash[t1[0]]}.${t1[1]})`
            break
          case 'mid':
            if(params[`j${j}`][3]){
              jObj[`j${j}`] = `MID(${tableHash[t1[0]]}.${t1[1]},${params[`j${j}`][2]},${params[`j${j}`][3]})`
            }else if(params[`j${j}`][2]){
              jObj[`j${j}`] = `MID(${tableHash[t1[0]]}.${t1[1]},${params[`j${j}`][2]})`
            }else{
              jObj[`j${j}`] = `MID(${tableHash[t1[0]]}.${t1[1]},1)`
            }
            break
          case 'len':
            jObj[`j${j}`] = `LEN(${tableHash[t1[0]]}.${t1[1]})`
            break
          case 'round':
            jObj[`j${j}`] = `ROUND(${tableHash[t1[0]]}.${t1[1]},${params[`j${j}`][2] || 0})`
            break
          case 'now':
            jObj[`j${j}`] = `NOW()`
            break
          case 'format':
            jObj[`j${j}`] = `FORMAT(${tableHash[t1[0]]}.${t1[1]},${params[`j${j}`][2]})`
            break
          default:
            break
        }
      }
    }

    let QQ = findTrans<MysqlCheckParams>(params, 1, {tableHash: tableHash, tableMain: tableMain, table}, PLATFORM_NAME.MYSQL)
    let QQ2 = findTrans<MysqlCheckParams>(params, 2, {tableHash: tableHash, tableMain: tableMain, jObj, table}, PLATFORM_NAME.MYSQL)
    let selectArr = []
    if(params.select){
      for(let n = 0; n < params.select.length; n++){
        if(params.select[n].indexOf('SELECT') > -1){
          selectArr.push(`(${params.select[n]}) AS ${tableMain}_s${n}`)
        }else{
          let jName = params.select[n].split(' ')[0]
          if(J_NAME_LIST.indexOf(jName) > -1){
            if(!params[jName]) throw new Error(FIND_NO_PJ_ERROR + jName)
            let asJname = params.select[n]
            if(params.select[n].indexOf(' as ') > -1){
              asJname = params.select[n].split(' as ')[1]
            }
            if(params.select[n].indexOf(' AS ') > -1){
              asJname = params.select[n].split(' AS ')[1]
            }
            selectArr.push(`${jObj[jName]} AS ${asJname}`)
          }else{
            let tempS = params.select[n].split('.')
            if(tempS.length === 1){
              selectArr.push(`${tableHash[tableMain]}.${tempS}`)
            }else{
              selectArr.push(`${tableHash[tempS[0]]}.${tempS[1]}`)
            }
          }
        }
      }
    }else{
      selectArr = ['*']
    }

    let groupArr = [] //长度为1，只有一个
    if(params.groupBy){
      let tempG = params.groupBy[0].split('.')
      if(tempG.length === 1){
        groupArr.push(`${tableHash[tableMain]}.${tempG[0]}`)
      }else{
        groupArr.push(`${tableHash[tempG[0]]}.${tempG[1]}`)
      }
    }

    let orderArr = [] //
    if(params.orderBy){
      let temp = params.orderBy
      for(let i = 0; i < temp.length; i++){
        let tempG = temp[i], tempO
        if(tempG[0] === '-'){
          tempO = tempG.replace('-', '').split('.')
          orderArr.push(`${tempO.length === 1 ? tempO[0] : tempO[1]} DESC`)
        }else{
          tempO = tempG.split('.')
          orderArr.push(`${tempO.length === 1 ? tempO[0] : tempO[1]} ASC`)
        }
      }
    }


    let sql = ''
    sql = `SELECT ${selectArr.length > 0 ? selectArr.toString() + ' ' : '* '}`
    + `FROM ${des.toString()} `
    + `${joinDes} `
    + (QQ === 2 ? ' ' : `WHERE ${QQ} `)
    + (groupArr.length > 0 ? `GROUP BY ${groupArr.toString()} ` : ' ')
    + (QQ2 === 2 ? ' ' : `HAVING ${QQ2} `)
    + (orderArr.length > 0 ? `ORDER BY ${orderArr.toString()} ` : ' ')
    + ((params.limit || params.page) ? `LIMIT ${params.limit || 20} ` : ' ')
    + ((params.page || params.limit) ? `OFFSET ${(params.limit || 20) * ((params.page || 1) - 1)}` : '')
    
    if(jUniqueTable.length > 0){
      //去掉重复命令的，以父查寻命名为准
      for(let t in tableHash){
        if(jUniqueTable.indexOf(t) > -1){
          let tempOneHash = `${t} AS ${tableHash[t]}`
          let oneHash = `${tableHash[t]}`
          let reg = new RegExp(`${t} AS [a-z]{14}`, 'g')
          let tempMatch = sql.match(reg) || []
          if(tempMatch.length > 1){
            for(let j = 0; j < tempMatch.length; j++){
              let thash = tempMatch[j].replace(`${t} AS `, '')
              if(tempMatch[j] !== tempOneHash){
                let reg2 = new RegExp(`,?${tempMatch[j]}`, 'g')
                sql = sql.replace(reg2, '')
              }
              let reg3 = new RegExp(`${thash}`, 'g')
              sql = sql.replace(reg3, oneHash)
            }
          }
        }
      }
    }
    //如果 jTable 有值，则，再进行替换
    for(let jt in jTable){
      let regJt = new RegExp(`${jt}`, 'g')
      sql = sql.replace(regJt, `${jTable[jt]}`)
    }
    sql = sql.replace(/\s+/ig, ' ')

    if(query === 'sentence'){
      resolve(sql)
      return
    }
    mysqlConnect(sql, [], (err, results, fields) => {
      if (err) {
        reject(err)
      }
      let jsonStr = JSON.stringify(results || [])
      resolve({data: {objects: JSON.parse(jsonStr)}})
    })
  })
}


export default fetchFind