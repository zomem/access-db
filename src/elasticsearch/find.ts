
import {client, esTable} from '../utils/dbElasticsearch'
import {TTable, ElasticsearchFindRes, ElasticsearchCheckParams} from '../index'
import findTrans from '../utils/findTrans'
import {PLATFORM_NAME} from '../constants/constants'
import { isArray } from '../utils/utils'
import { ORDER_BY_NOT_ARRAY, SELECT_NOT_ARRAY } from '../constants/error'

function fetchFind(table: TTable, params: ElasticsearchCheckParams): Promise<ElasticsearchFindRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      if(!client) return
      let QQ: any = findTrans<any>(params, 1, null, PLATFORM_NAME.ELASTICSEARCH)

      /** 筛选哪些字段要返回，那些不返回 */
      let tempSelect = {
        _source_excludes: [],
        _source_includes: []
      }
      if(params.select){
        if(!isArray(params.select)) throw new Error(SELECT_NOT_ARRAY)
        params.select.forEach(item => {
          if(item[0] === '-'){
            tempSelect._source_excludes.push(item.substring(1))
          }else{
            tempSelect._source_includes.push(item)
          }
        });
      }

      /** 排序 */
      let sort: any = []
      if(params.orderBy){
        if(!isArray(params.orderBy)) throw new Error(ORDER_BY_NOT_ARRAY)
        params.orderBy.forEach(item => {
          if(item[0] === '-'){
            sort.push({
              [`${item.substring(1)}`]: 'desc'
            })
          }else{
            sort.push({
              [`${item}`]: 'asc'
            })
          }
        })
      }
      
      let res = await client.search({
        index: esTable(table),
        query: QQ === 2 ? {match_all: {}} : QQ,
        size: params.limit || 20,
        from: (params.limit || 20) * ((params.page || 1) - 1),
        ...tempSelect,
        sort,
      })
      let tempTotal = 0
      if(typeof(res.hits.total) === 'number'){
        tempTotal = res.hits.total
      }else{
        tempTotal = res.hits.total.value
      }
      let tempObjs: any = []
      for(let i = 0; i < res.hits.hits.length; i++){
        let tempSource: {} = res.hits.hits[i]._source || {}
        tempObjs.push({
          _index: res.hits.hits[i]._index,
          _id: res.hits.hits[i]._id,
          _score: res.hits.hits[i]._score,
          ...tempSource,
        })
      }
      resolve({data: {
        objects: tempObjs,
        took: res.took,
        max_score: res.hits.max_score,
        total: tempTotal
      }})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchFind