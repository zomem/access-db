import _mssql from 'mssql'


const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DATABASE,
  server: process.env.MSSQL_HOST,
  port: +process.env.MSSQL_PORT || 1433,
  pool: {
    max: +process.env.MSSQL_POOL_MAX || 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: process.env.MSSQL_AZURE ? true : false, // for azure
    trustServerCertificate: process.env.MSSQL_DEV ? true : false // change to true for local dev / self-signed certs
  }
}


// run a query against the global connection pool
export const runSql = async (sql: string) => {
  if(!config.server) return null
  await _mssql.connect(config)
  const result = await _mssql.query(`${sql}`)
  return result
}


