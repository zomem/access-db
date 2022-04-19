
import {client, esTable} from '../utils/dbElasticsearch'
import {TTable, ElasticsearchGetRes} from '../index'


function fetchGet(table: TTable, uniKey: string): Promise<ElasticsearchGetRes>{
  return new Promise(async (resolve, reject)=>{
    try{
      if(!client) return
      let res = await client.get({index: esTable(table), id: uniKey})
      let temp: {} = res._source || {}
      resolve({data: {
        ...temp,
        _id: res._id,
         _index: res._index,
        _version: res._version,
        _seq_no: res._seq_no,
        _primary_term: res._primary_term,
        found: res.found,
      }})
    }catch(err: any){
      reject(err)
    }
  })
}


export default fetchGet