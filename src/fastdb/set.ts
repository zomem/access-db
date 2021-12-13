import {FastdbSetParams, FastdbSetRes} from '../index'
import {pathTo, mkdir} from '../utils/pathTo'
import {strHash} from '../utils/timeHash'
import {FASTDB_HAVE_ID_ERROR} from '../constants/error'
import {isNumber, changeSetParams} from '../utils/utils'

const fs = require('fs')

function fetchSet(table: string, params: FastdbSetParams={}): FastdbSetRes {
  const filePath = pathTo(table)
  let oldBuf, tempParams = {...params}
  if (!fs.existsSync(filePath)) {
    mkdir(filePath, '[]')
  }
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
  oldBuf = fs.readFileSync(filePath)
  if(isNumber(tempParams.id)){
    if(oldBuf.includes(`"id":${tempParams.id}`)){
      throw new Error(FASTDB_HAVE_ID_ERROR + ': ' + tempParams.id)
    }
  }else{
    if(oldBuf.includes(`"id":"${tempParams.id}"`)){
      throw new Error(FASTDB_HAVE_ID_ERROR + ': ' + tempParams.id)
    }
  }
  
  let offset = oldBuf.length - 1
  let nowBuf = Buffer.from((oldBuf.length === 2 ? '' : ',') + JSON.stringify(changeSetParams(tempParams)) + ']')
  let tempBuf = Buffer.concat([oldBuf, Buffer.allocUnsafe(nowBuf.length-1)])
  let addBuf = tempBuf.fill(nowBuf, offset)
  fs.writeFileSync(filePath, addBuf)
  return {data: {insertId: tempParams.id as string | number}}
}


export default fetchSet