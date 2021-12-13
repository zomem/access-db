import {pathTo} from '../utils/pathTo'
import {FastdbGetRes} from '../index'
import {FASTDB_FILE_ERROR, FASTDB_GET_ID_ERROR} from '../constants/error'
import {isNumber} from '../utils/utils'

const fs = require('fs')


function fetchGet(table: string, id: string | number): FastdbGetRes {
  const filePath = pathTo(table)
  let oldBuf, result
  if (!fs.existsSync(filePath)) {
    throw new Error(FASTDB_FILE_ERROR)
  }
  if(!id){
    throw new Error(FASTDB_GET_ID_ERROR)
  }

  oldBuf = fs.readFileSync(filePath)
  let start = isNumber(id) ? oldBuf.indexOf(`{"id":${id}`) : oldBuf.indexOf(`{"id":"${id}"`)
  if(start === -1){
    // 没有
    result = {}
  }else{
    let end = oldBuf.indexOf(`,{"id"`, start + 8)
    if(end === -1){
      end = oldBuf.length - 1
    }
    result = JSON.parse(oldBuf.slice(start, end).toString())
  }

  return {data: result}
}


export default fetchGet