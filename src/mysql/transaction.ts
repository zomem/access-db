
import {mysqlPool} from '../utils/dbMysql'
import {isArray} from '../utils/utils'
import {MysqlGetRes, MysqlSetRes, MysqlFindRes, MysqlDeleteRes, MysqlUpdateRes, MysqlTransactionRes} from '../index'


type TRun = MysqlGetRes | MysqlSetRes | MysqlFindRes | MysqlDeleteRes | MysqlUpdateRes

let pool = mysqlPool()

const connectQuery = (con, sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, [], (err, res) => {
      if(err) reject(err)
      resolve(res)
    })
  })
}

function getConnection(): Promise<any>{
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err)
      resolve(connection)
    })
  })
}




function fetchTransaction(): Promise<MysqlTransactionRes>{
  return new Promise(async (resolve_all, reject_all) => {
    let connection = await getConnection()

    let isTran = false  // 事务是否开启

    // 回滚事务
    let rollback = (): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        connection.rollback(() => {
          connection.release()
          resolve(true)
        })
      })
    }

    // 运行sql
    let run = (sql): Promise<TRun> => {
      return new Promise(async (resolve, reject) => {
        try{
          if(!isTran){
            connection.release()
            reject('事务未开启')
          }
          let run_res: TRun = {
            data: {},
            objects: []
          }
          let jsonStr = JSON.stringify(await connectQuery(connection, sql))
          let jsonRes = JSON.parse(jsonStr)
          if(isArray(jsonRes)){
            run_res.data = jsonRes[0] || {}
            run_res.data.objects = jsonRes
          }else{
            run_res.data = jsonRes
            run_res.data.objects = []
          }
          resolve(run_res)
        }catch(run_err){
          connection.release()
          reject(run_err)
        }
      })
    }

    // 开始事务
    let begin = (callback) => {
      return new Promise((resolve, reject) => {
        connection.beginTransaction(async (err) => {
          if(err) {
            isTran = false
            reject(err)
          }else{
            isTran = true
            await callback()
            resolve(true)
          }
        })
      })
    }

    
    // 提交事务
    let commit = (): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        connection.commit((err) => {
          if(err) {
            connection.release()
            reject(err)
          }
          connection.release()
          resolve(true)
        })
      })
    }

    resolve_all({
      begin,
      run,
      rollback,
      commit,
      locks: {
        shared_locks: ' LOCK IN SHARE MODE',
        exclusive_locks: ' FOR UPDATE'
      }
    })
  })
}

export default fetchTransaction