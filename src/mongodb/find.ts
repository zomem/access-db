
import {mongodbCollection, mongodb} from '../utils/dbConnect'
import {PARAM_TABLE_ERROR} from '../constants/error'
import {TTable, IMongodbCheckParams, IMongodbFindRes, TSentence} from '../index'
import findTrans from '../utils/findTrans'
import {PLATFORM_NAME} from '../constants/constants'


function fetchFind(table: TTable, params: IMongodbCheckParams): Promise<IMongodbFindRes>
function fetchFind(table: TTable, params: IMongodbCheckParams, query: TSentence): Promise<string>
function fetchFind(table: TTable, params: IMongodbCheckParams, query?: TSentence): Promise<IMongodbFindRes | string>{
  if(!table) throw new Error(PARAM_TABLE_ERROR)
  return new Promise((resolve, reject)=>{
    let QQ = findTrans<IMongodbCheckParams>(params, 1, mongodb, PLATFORM_NAME.MONGODB) || {}
    let sortObj = {}
    if(params.orderBy){
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
      resolve(QQ)
      return
    }
    mongodbCollection((db, client) => {
      db.collection(table).find(QQ)
      .limit(params.limit || 20)
      .skip((params.limit || 20) * ((params.page || 1) - 1))
      .sort(sortObj).toArray(function(err, res) {
        if (err) reject(err)
        client.close()
        resolve({data: {objects: res || []}})
      })
    })
  })
}


export default fetchFind