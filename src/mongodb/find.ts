
import {mongodbCollection} from '../utils/dbMongodb'
import {PARAM_TABLE_ERROR} from '../constants/error'
import {TTable, MongodbCheckParams, MongodbFindRes, TSentence} from '../index'
import findTrans from '../utils/findTrans'
import {PLATFORM_NAME} from '../constants/constants'



function fetchFind(table: TTable, params: MongodbCheckParams): Promise<MongodbFindRes>
function fetchFind(table: TTable, params: MongodbCheckParams, query: TSentence): Promise<any>
function fetchFind(table: TTable, params: MongodbCheckParams = {}, query?: TSentence): Promise<MongodbFindRes | any>{
  return new Promise(async (resolve, reject)=>{
    const {client, db} = await mongodbCollection()
    if(!client) return
    if(!table) throw new Error(PARAM_TABLE_ERROR)
    try{
      let QQ = findTrans<MongodbCheckParams>(params, 1, null, PLATFORM_NAME.MONGODB)
      let sortObj = {}
      if(params?.orderBy){
        let temp = params.orderBy
        for(let i = 0; i < temp.length; i++){
          if(temp[i][0] === '-'){
            sortObj[temp[i].substring(1, temp[i].length)] = -1
          }else{
            sortObj[temp[i]] = 1
          }
        }
      }
      if(query === 'sentence'){
        return resolve(QQ)
      }

      await client.connect()
      let res = await db.collection(table).find(QQ === 2 ? {} : QQ)
                .limit(params.limit || 20)
                .skip((params.limit || 20) * ((params.page || 1) - 1))
                .sort(sortObj).toArray()

      resolve({data: {objects: res || []}})
      client.close()
    }catch(err){
      reject(err)
      client.close()
    }
  })
}


export default fetchFind