import {IFastdbParams, IFastdbSetRes} from '../index'
import {pathTo, mkdir} from '../utils/pathTo'
import {strHash} from '../utils/timeHash'
import {FASTDB_HAVE_ID_ERROR} from '../constants/error'
import {isNumber, changeSetParams} from '../utils/utils'

const fs = require('fs')

function fetchSet(table: string, params: IFastdbParams={}): IFastdbSetRes {
  const filePath = pathTo(table)
  let oldBuf
  if (!fs.existsSync(filePath)) {
    mkdir(filePath, '[]')
  }
  let rid = strHash()
  if(!params.id){
    delete params._fid
    params = {
      _fid: rid,
      id: rid,
      ...params
    }
  }else{
    delete params._fid
    params = {
      _fid: params.id,
      ...params
    }
  }
  oldBuf = fs.readFileSync(filePath)
  if(isNumber(params._fid)){
    if(oldBuf.includes(`"_fid":${params._fid}`)){
      throw new Error(FASTDB_HAVE_ID_ERROR + ': ' + params._fid)
    }
  }else{
    if(oldBuf.includes(`"_fid":"${params._fid}"`)){
      throw new Error(FASTDB_HAVE_ID_ERROR + ': ' + params._fid)
    }
  }
  
  let offset = oldBuf.length - 1
  let nowBuf = Buffer.from((oldBuf.length === 2 ? '' : ',') + JSON.stringify(changeSetParams(params)) + ']')
  let tempBuf = Buffer.concat([oldBuf, Buffer.allocUnsafe(nowBuf.length-1)])
  let addBuf = tempBuf.fill(nowBuf, offset)
  fs.writeFileSync(filePath, addBuf)
  return {data: {insertId: params.id as string | number}}
}


export default fetchSet