import {mongodbCollection} from '../utils/dbMongodb'
import {MongodbUpdatemanyParams, TTable, MongodbUpdatemanyRes, MongodbSession} from '../index'
import updatemanyTrans from '../utils/updatemanyTrans'
import {PLATFORM_NAME} from '../constants/constants'



function fetchUpdateMany(table: TTable, key: string[] | string, params: MongodbUpdatemanyParams, session?: MongodbSession): Promise<MongodbUpdatemanyRes>{
  return new Promise(async (resolve, reject)=>{
    const {client, db} = await mongodbCollection()
    if(!client) return
    try{
      await client.connect()
      let bulkList = updatemanyTrans<MongodbUpdatemanyParams>(params, key, PLATFORM_NAME.MONGODB)
      let res = (await db.collection(table).bulkWrite(bulkList, {session})) as any
      resolve({data: res})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}


export default fetchUpdateMany