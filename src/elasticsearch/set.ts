
import {client, esTable} from '../utils/dbElasticsearch'
import {TTable, ElasticsearchSetRes, ElasticsearchSetParams} from '../index'


function fetchSet(table: TTable, params: ElasticsearchSetParams = {}): Promise<ElasticsearchSetRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      if(!client) return
      const tempParams = JSON.parse(JSON.stringify(params))
      const _id = tempParams._id
      delete tempParams._id
      let res
      if(_id){
        res = await client.create({
          index: esTable(table),  // 必填, 如果没有，则自动创建
          id: _id,      // 必填，如果已有，则不创建
          document: tempParams
        })
      }else{
        res = await client.index({
          index: esTable(table),  // 必填, 如果没有，则自动创建
          document: tempParams
        })
      }
      resolve({data: {insertId: res._id}})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchSet