import {pathTo} from '../utils/pathTo'
import {IFastdbCountParams, ICountRes} from '../index'
import { PLATFORM_NAME } from '../constants/constants'
import {FASTDB_FILE_ERROR} from '../constants/error'
import findTrans from '../utils/findTrans'

const fs = require('fs')
const POSITION_STEP = 9

function fetchCount(table: string, params: IFastdbCountParams): ICountRes {
  const filePath = pathTo(table)
  let oldBuf, num: number = 0
  if (!fs.existsSync(filePath)) {
    throw new Error(FASTDB_FILE_ERROR)
  }

  oldBuf = fs.readFileSync(filePath)

  let t_positon=POSITION_STEP, t_json, n=0

  while (t_positon < oldBuf.length) { 
    let start = oldBuf.lastIndexOf(`{"_fid":`, t_positon)
    let end = oldBuf.indexOf(`,{"_fid"`, t_positon)
    if(end === -1){
      end = oldBuf.length - 1
    }
    if(start > -1){
      t_json = JSON.parse(oldBuf.slice(start, end).toString())
    }
    let isOk = findTrans(params, 1, t_json, PLATFORM_NAME.FASTDB)
    if(isOk){
      num++
    }
    t_positon = end + POSITION_STEP
  }

  return {data: num}
}


export default fetchCount