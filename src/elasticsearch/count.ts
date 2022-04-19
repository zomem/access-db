
import {client} from '../utils/dbElasticsearch'
import {TTable, CountRes, ElasticsearchCountParams} from '../index'

import fetchFind from './find'

function fetchCount(table: TTable, params: ElasticsearchCountParams): Promise<CountRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      if(!client) return
      let findRes = await fetchFind(table, {
        ...params,
        limit: 1,
      })
      resolve({data: findRes.data.total})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchCount