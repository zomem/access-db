import {mongodbCollection, mongodbId} from '../utils/dbMongodb'

import {MongodbSession, MongodbTransactionRes} from '../index'





function fetchTransaction(): Promise<MongodbTransactionRes>{
  return new Promise(async (resolve_all, reject_all) => {
    const {client, db} = await mongodbCollection()
    if(!client) return

    const session = client.startSession()

    // 开始事务
    const begin = (callback: (session: MongodbSession) => void) => {
      return new Promise(async (resolve, reject) => {
        try {
          await session.withTransaction(async () => {
            await callback(session)
            resolve(true)
          })
        } catch (err) {
          reject(err)
        } finally {
          await session.endSession()
          await client.close()
        }
      })
    }
    
    // 回滚事务
    const rollback = (): Promise<boolean> => {
      return new Promise(async (resolve, reject) => {
        await session.abortTransaction()
        resolve(true)
      })
    }
    
    resolve_all({
      begin,
      rollback
    })
  })
}

export default fetchTransaction