import {mongodbCollection} from '../utils/dbMongodb'
import {changeSetManyParams, isArray} from '../utils/utils'
import {TTable, MongodbSetParams, MongodbSetmanyRes} from '../index'
import {SET_MANY_PARAMS_ARR_ERROR, PARAMS_EMPTY_ARR_ERROR} from '../constants/error'

const {client, db} = mongodbCollection


function fetchSetmany(table: TTable, params: MongodbSetParams[]): Promise<MongodbSetmanyRes>{
  if(!client) return
  if(!isArray(params)) throw new Error(SET_MANY_PARAMS_ARR_ERROR)
  if(params.length === 0) throw new Error(PARAMS_EMPTY_ARR_ERROR)
  return new Promise(async (resolve, reject)=>{
    try{
      await client.connect()
      let res = await db.collection(table).insertMany(changeSetManyParams(params), {ordered: true})
      await client.close()
      resolve({data: res})
    }catch(err){
      await client.close()
      reject(err)
    }
  })
}

export default fetchSetmany