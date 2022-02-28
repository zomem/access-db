import {mongodbCollection} from '../utils/dbMongodb'
import {changeSetManyParams, isArray} from '../utils/utils'
import {TTable, MongodbSetParams, MongodbSetmanyRes} from '../index'
import {SET_MANY_PARAMS_ARR_ERROR, PARAMS_EMPTY_ARR_ERROR} from '../constants/error'



function fetchSetmany(table: TTable, params: MongodbSetParams[]): Promise<MongodbSetmanyRes>{
  return new Promise(async (resolve, reject)=>{
    const {client, db} = await mongodbCollection()
    if(!client) return
    if(!isArray(params)) throw new Error(SET_MANY_PARAMS_ARR_ERROR)
    if(params.length === 0) throw new Error(PARAMS_EMPTY_ARR_ERROR)
    try{
      await client.connect()
      let res = await db.collection(table).insertMany(changeSetManyParams(params), {ordered: true})
      resolve({data: res})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}

export default fetchSetmany