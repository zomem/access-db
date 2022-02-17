import { createClient } from 'redis'


const host = process.env.REDIS_HOST || 'localhost'
const user = process.env.REDIS_USER || ''
const password = process.env.REDIS_PASSWORD || ''
const database = process.env.REDIS_DATABASE || ''
const port = process.env.REDIS_PORT || '6379'

export const redisClient = process.env.REDIS_HOST ? createClient({
  url: `redis://${password ? (user + ':' + password + '@') : ''}${host}:${port}`
}) : null
if(process.env.REDIS_HOST){
  redisClient.connect()
}

export const reTable = (table) => {
  return database ? database + '_' + table : table
}