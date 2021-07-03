import {pathTo} from '../utils/pathTo'
import {IFastdbCheckParams, IFastdbFindRes} from '../index'
import { PLATFORM_NAME } from '../constants/constants'
import {FASTDB_FILE_ERROR} from '../constants/error'
import findTrans from '../utils/findTrans'

const fs = require('fs')
const POSITION_STEP = 9

function fetchFind(table: string, params: IFastdbCheckParams): IFastdbFindRes {
  const filePath = pathTo(table)
  let oldBuf, result: any[] = []
  if (!fs.existsSync(filePath)) {
    throw new Error(FASTDB_FILE_ERROR)
  }

  oldBuf = fs.readFileSync(filePath)
  // let os = oldBuf.indexOf(`{"_fid":`)
  // let oe = oldBuf.indexOf(`,{"_fid"`)
  // if(oe === -1) oe = oldBuf.length - 1
  // let offset = oe - os


  let t_positon=POSITION_STEP, t_json, n=0
  let limit = (params.limit || 20)
  let all = limit * (params.page || 1)

  while (result.length < all && t_positon < oldBuf.length) { 
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
      result.push(t_json)
    }
    t_positon = end + POSITION_STEP
  }

  return {data: {objects: result.slice(-limit)}}
}


export default fetchFind