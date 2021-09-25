
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

    // 回滚事务
    let rollback = (): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        connection.rollback(() => {
          resolve(true)
        })
      })
    }

    // 运行sql
    let run = (sql): Promise<TRun> => {
      return new Promise(async (resolve, reject) => {
        try{
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
          reject(run_err)
        }
      })
    }

    // 开始事务
    let begin = (callback) => {
      return new Promise((resolve, reject) => {
        connection.beginTransaction(async (err) => {
          if(err) reject(err)
          await callback()
          resolve(true)
        })
        connection.release()
      })
    }

    
    // 提交事务
    let commit = (): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        connection.commit((err) => {
          if(err) reject(err)
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
        shared_locks: ' lock in share mode',
        exclusive_locks: ' for update'
      }
    })
  })
}


export default fetchTransaction