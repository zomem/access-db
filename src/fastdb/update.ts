import {pathTo} from '../utils/pathTo'
import {FastdbUpdateRes, FastdbUpdateParams} from '../index'
import {FASTDB_FILE_ERROR, FASTDB_GET_ID_ERROR, FASTDB_UPDATE_ID_ERROR} from '../constants/error'
import {isNumber} from '../utils/utils'
import updateTrans from '../utils/updateTrans'
import { PLATFORM_NAME } from '../constants/constants'

const fs = require('fs')


function fetchUpdate(table: string, id: string | number, params: FastdbUpdateParams): FastdbUpdateRes {
  const filePath = pathTo(table)
  let oldBuf, result, tempJson, start=-1, end=-1
  if (!fs.existsSync(filePath)) {
    throw new Error(FASTDB_FILE_ERROR)
  }
  if(!id){
    throw new Error(FASTDB_GET_ID_ERROR)
  }
  if(params.id){
    throw new Error(FASTDB_UPDATE_ID_ERROR)
  }

  oldBuf = fs.readFileSync(filePath)
  start = isNumber(id) ? oldBuf.indexOf(`{"id":${id}`) : oldBuf.indexOf(`{"id":"${id}"`)
  if(start === -1){
    // 没有
    result = {}
  }else{
    end = oldBuf.indexOf(`,{"id"`, start + 8)
    if(end === -1){
      // 没有
      end = oldBuf.length - 1
    }
    tempJson = JSON.parse(oldBuf.slice(start, end).toString())
    result = updateTrans(params, tempJson, PLATFORM_NAME.FASTDB)
    let nowBuf = Buffer.from(JSON.stringify(result))
    let leftBuf = oldBuf.slice(0, start)
    let rightBuf = oldBuf.slice(end)
    let resBuf = Buffer.concat([leftBuf, nowBuf, rightBuf])
    fs.writeFileSync(filePath, resBuf)
  }


  return {data: result}
}


export default fetchUpdate