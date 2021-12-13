import {pathTo} from '../utils/pathTo'
import {FastdbDeleteRes} from '../index'
import {FASTDB_FILE_ERROR, FASTDB_GET_ID_ERROR} from '../constants/error'
import {isNumber} from '../utils/utils'

const fs = require('fs')


function fetchDel(table: string, id: string | number): FastdbDeleteRes {
  const filePath = pathTo(table)
  let oldBuf, result, start=-1, end=-1
  if (!fs.existsSync(filePath)) {
    throw new Error(FASTDB_FILE_ERROR)
  }
  if(!id){
    throw new Error(FASTDB_GET_ID_ERROR)
  }

  oldBuf = fs.readFileSync(filePath)
  start = isNumber(id) ? oldBuf.indexOf(`{"id":${id}`) : oldBuf.indexOf(`{"id":"${id}"`)
  if(start === -1){
    // 没有
    result = 0
  }else{
    end = oldBuf.indexOf(`,{"id"`, start + 8)
    if(end === -1){
      // 没有
      end = oldBuf.length - 1
    }else{
      end = start === 1 ? end + 1 : end
    }
    let leftBuf = oldBuf.slice(0, start === 1 ? start : start - 1)
    let rightBuf = oldBuf.slice(end)
    let resBuf = Buffer.concat([leftBuf, rightBuf])
    fs.writeFileSync(filePath, resBuf)
    result = 1
  }

  return {data: result}
}


export default fetchDel