
import {mongodbCollection, mongodbId} from '../utils/dbMongodb'
import {isJson, isMongodbObjectId, isArray} from '../utils/utils'
import {TTable, MongodbDeleteRes, MongodbUpdateKey} from '../index'
import {PARAMS_EMPTY_ARR_ERROR, PARAMS_NOT_ARR_ERROR} from '../constants/error'

const {client, db} = mongodbCollection

function fetchDelmany(table: TTable, uniKeys: number[] | string[] | MongodbUpdateKey[]): Promise<MongodbDeleteRes>{
  if(!client) return
  return new Promise(async (resolve, reject)=>{
    try{
      let tempID='_id', tempData: any[] = []
      if(!isArray(uniKeys)) throw new Error(PARAMS_NOT_ARR_ERROR)
      if(uniKeys.length === 0) throw new Error(PARAMS_EMPTY_ARR_ERROR)
      for(let i = 0; i < uniKeys.length; i++){
        let uniKey = uniKeys[i]
        if(isMongodbObjectId(uniKey)){
          tempData.push(uniKey)
        }else{
          if(isJson(uniKey)){
            for(let p in uniKey as MongodbUpdateKey){
              if(i === 0) tempID=p
              if(isMongodbObjectId(uniKey[p])){
                tempData.push(uniKey[p])
              }else{
                tempData.push(mongodbId(uniKey[p]))
              }
              break
            }
          }else{
            tempData.push(mongodbId(uniKey))
          }
        }
        
      }
      await client.connect()
      let res: any = await db.collection(table).deleteMany({[tempID]: {'$in': tempData}})
      await client.close()
      resolve({data: res})
    }catch(err){
      await client.close()
      reject(err)
    }
  })
}


export default fetchDelmany