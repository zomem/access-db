import {mongodbCollection} from '../utils/dbConnect'
import {PLATFORM_NAME} from '../constants/constants'
import {IMongodbDeleteParams, TTable} from '../index'
import findTrans from '../utils/findTrans'



function fetchDelmany(table: TTable, params: IMongodbDeleteParams): Promise<any>{
  return new Promise((resolve, reject)=>{
    let QQ = findTrans<IMongodbDeleteParams>(params, 1, null, PLATFORM_NAME.MONGODB)
    mongodbCollection((db, client) => {
      db.collection(table).deleteMany(QQ, (err, res) => {
        if(err) reject(err)
        client.close()
        resolve({deletedCount: res.deletedCount})
      })
    })
  })
}


export default fetchDelmany