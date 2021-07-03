import {pathTo} from '../utils/pathTo'
import {IFastdbGetRes} from '../index'
import {FASTDB_FILE_ERROR, FASTDB_GET_ID_ERROR} from '../constants/error'
import {isNumber} from '../utils/utils'

const fs = require('fs')


function fetchGet(table: string, id: string | number): IFastdbGetRes {
  const filePath = pathTo(table)
  let oldBuf, result
  if (!fs.existsSync(filePath)) {
    throw new Error(FASTDB_FILE_ERROR)
  }
  if(!id){
    throw new Error(FASTDB_GET_ID_ERROR)
  }

  oldBuf = fs.readFileSync(filePath)
  let start = isNumber(id) ? oldBuf.indexOf(`{"_fid":${id}`) : oldBuf.indexOf(`{"_fid":"${id}"`)
  if(start === -1){
    // 没有
    result = {}
  }else{
    let end = oldBuf.indexOf(`,{"_fid"`, start + 8)
    if(end === -1){
      end = oldBuf.length - 1
    }
    result = JSON.parse(oldBuf.slice(start, end).toString())
  }

  return {data: result}
}


export default fetchGet