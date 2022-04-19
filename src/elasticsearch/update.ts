
import {client, esTable} from '../utils/dbElasticsearch'
import {TTable, ElasticsearchUpdateParams, ElasticsearchUpdateRes} from '../index'
import updateTrans from '../utils/updateTrans'
import { PLATFORM_NAME } from '../constants/constants'



function fetchUpdate(table: TTable, uniKey: string, params: ElasticsearchUpdateParams): Promise<ElasticsearchUpdateRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      if(!client) return
      let records = updateTrans<ElasticsearchUpdateParams>(params, {}, PLATFORM_NAME.ELASTICSEARCH)
      let res = await client.update({
        index: esTable(table),
        id: uniKey,
        script: records
      })
      resolve({data: res})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchUpdate