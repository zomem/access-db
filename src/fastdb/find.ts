import {pathTo} from '../utils/pathTo'
import {FastdbCheckParams, FastdbFindRes} from '../index'
import { PLATFORM_NAME } from '../constants/constants'
import {FASTDB_FILE_ERROR, ORDER_BY_NOT_ARRAY} from '../constants/error'
import findTrans from '../utils/findTrans'
import {fastdbSort, isArray} from '../utils/utils'

const fs = require('fs')
const POSITION_STEP = 9

function fetchFind(table: string, params: FastdbCheckParams = {}): FastdbFindRes {

  const filePath = pathTo(table)
  let oldBuf, result: any[] = [], newarr: any[] = []
  if (!fs.existsSync(filePath)) {
    throw new Error(FASTDB_FILE_ERROR)
  }

  oldBuf = fs.readFileSync(filePath)

  let limit = (params.limit || 20)
  let all = limit * (params.page || 1)
  let t_positon=POSITION_STEP, t_json, n=0
  
  
  if(params.orderBy){
    if(!isArray(params.orderBy)) throw new Error(ORDER_BY_NOT_ARRAY)
    let all_json = JSON.parse(oldBuf.toString())
    if(params.orderBy[0][0] === '-'){
      newarr = fastdbSort(all_json, params.orderBy[0].substr(1), 0)
    }else{
      newarr = fastdbSort(all_json, params.orderBy[0], 1)
    }
    let index: number = 0
    while (result.length < all && index < newarr.length) { 
      t_json = newarr[index]
      let isOk = findTrans(params, 1, t_json, PLATFORM_NAME.FASTDB)
      if(isOk){
        result.push(t_json)
      }
      index++
    }
    result = result.slice(all - limit, all)
  }else{
    while (result.length < all && t_positon < oldBuf.length) { 
      let start = oldBuf.lastIndexOf(`{"id":`, t_positon)
      let end = oldBuf.indexOf(`,{"id"`, t_positon)
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
    result = result.slice(all - limit, all)
  }

  // let tempAdd: any[] = []
  // if(params.select){
  //   for(let i = 0; i < result.length; i++){
  //     let o = {}
  //     for(let j = 0; j < params.select.length; j++){
  //       if(params.select[j][0] === '-'){
  //         delete result[i][params.select[j].substr(1)]
  //       }else{
  //         o[result[i][params.select[j]]]
  //       }
  //     }
  //   }
  // }

  return {data: {objects: result}}
}


export default fetchFind