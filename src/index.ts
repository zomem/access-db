

import mongodb_temp from './mongodb/index'
import mysql_temp from './mysql/index'
import redis_temp from './redis/index'
import fastdb_temp from './fastdb'
import promiselimit_temp from './common/promiselimit'



export const mongodb = mongodb_temp
export const mysql = mysql_temp
export const redis = redis_temp
export const fastdb = fastdb_temp
export const promiselimit = promiselimit_temp

export default {
  mongodb: mongodb_temp,
  mysql: mysql_temp,
  redis: redis_temp,
  fastdb: fastdb_temp,
  promiselimit: promiselimit_temp
}













//查寻的表名或表id
export type TTable = string



//查寻的方法
export type TMongodbCheckMethod = '=' | '!=' | '<' | '<=' | '>' | '>=' |
'in' | 'notIn' | 'arrContain' | 'regex' | 'strLength' | 'isExists' | 
'geoInclude' | 'geoWithinCircle' | 'geoWithinRegion' | 'geoWithin'

type TMongodbBSONTypes = 'double' | 'string' | 'object' | 'array' | 'binData' | 
'objectId' | 'bool' | 'date' | 'null' | 'regex' | 'javascript' | 'int' | 
'timestamp' | 'long' | 'decimal' | 'minKey' | 'maxKey'

export type TMysqlCheckMethod = '=' | '!=' | '<' | '<=' | '>' | '>=' |
'in' | 'notIn' | 'regex' | 'strLength' | 
'like' | 'between' | 'notBetween' |
'isNull' | 'isExists'

export type TFastdbCheckMethod = '=' | '!=' | '<' | '<=' | '>' | '>=' |
'in' | 'notIn' | 'arrContain' | 'regex' | 'strLength' | 'isExists'

//j方法，mysql的join 聚合等
export type TMysqlJiaMethod = 'uniqueTable' | 'tableOf' | 'inner' | 'left' | 'right' | 'full' | 'count' | 
'sum' | 'max' | 'min' | 'avg' | 'ucase' | 'lcase' |
'mid' | 'len' | 'round' | 'now' | 'format'

export type TMysqlJiaParams = 'distinct' | 'all'
//j参数
export type TJ = 'j0' | 'j1' | 'j2' | 'j3' | 'j4' | 'j5'

//查寻的参数
export type TP = 'p0' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8'
| 'p9' | 'p10' | 'p11' | 'p12' | 'p13' | 'p14' | 'p15' | 'p16' | 'p17' | 'p18' | 'p19'



interface MysqlPRList {
  j0?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j1?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j2?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j3?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j4?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j5?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  p0?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p1?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p2?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p3?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p4?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p5?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p6?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p7?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p8?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p9?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p10?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p11?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p12?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p13?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p14?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p15?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p16?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p17?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p18?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p19?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  r?: string
  r2?: string
}


interface MongodbPRList {
  p0?: [string, TMongodbCheckMethod, ...any[]] | [string, 'type', TMongodbBSONTypes | TMongodbBSONTypes[]]
  p1?: [string, TMongodbCheckMethod, ...any[]] | [string, 'type', TMongodbBSONTypes]
  p2?: [string, TMongodbCheckMethod, ...any[]] | [string, 'type', TMongodbBSONTypes]
  p3?: [string, TMongodbCheckMethod, ...any[]]
  p4?: [string, TMongodbCheckMethod, ...any[]]
  p5?: [string, TMongodbCheckMethod, ...any[]]
  p6?: [string, TMongodbCheckMethod, ...any[]]
  p7?: [string, TMongodbCheckMethod, ...any[]]
  p8?: [string, TMongodbCheckMethod, ...any[]]
  p9?: [string, TMongodbCheckMethod, ...any[]]
  p10?: [string, TMongodbCheckMethod, ...any[]]
  p11?: [string, TMongodbCheckMethod, ...any[]]
  p12?: [string, TMongodbCheckMethod, ...any[]]
  p13?: [string, TMongodbCheckMethod, ...any[]]
  p14?: [string, TMongodbCheckMethod, ...any[]]
  p15?: [string, TMongodbCheckMethod, ...any[]]
  p16?: [string, TMongodbCheckMethod, ...any[]]
  p17?: [string, TMongodbCheckMethod, ...any[]]
  p18?: [string, TMongodbCheckMethod, ...any[]]
  p19?: [string, TMongodbCheckMethod, ...any[]]
  r?: string
  r2?: string
}

interface FastdbPRList {
  p0?: [string, TFastdbCheckMethod, ...any[]]
  p1?: [string, TFastdbCheckMethod, ...any[]]
  p2?: [string, TFastdbCheckMethod, ...any[]]
  p3?: [string, TFastdbCheckMethod, ...any[]]
  p4?: [string, TFastdbCheckMethod, ...any[]]
  p5?: [string, TFastdbCheckMethod, ...any[]]
  p6?: [string, TFastdbCheckMethod, ...any[]]
  p7?: [string, TFastdbCheckMethod, ...any[]]
  p8?: [string, TFastdbCheckMethod, ...any[]]
  p9?: [string, TFastdbCheckMethod, ...any[]]
  p10?: [string, TFastdbCheckMethod, ...any[]]
  p11?: [string, TFastdbCheckMethod, ...any[]]
  p12?: [string, TFastdbCheckMethod, ...any[]]
  p13?: [string, TFastdbCheckMethod, ...any[]]
  p14?: [string, TFastdbCheckMethod, ...any[]]
  p15?: [string, TFastdbCheckMethod, ...any[]]
  p16?: [string, TFastdbCheckMethod, ...any[]]
  p17?: [string, TFastdbCheckMethod, ...any[]]
  p18?: [string, TFastdbCheckMethod, ...any[]]
  p19?: [string, TFastdbCheckMethod, ...any[]]
  r?: string
}

export interface MongodbCheckParams extends MongodbPRList {
  page?: number
  limit?: number
  orderBy?: string[]
  select?: string[]
  groupBy?: string[]
}
export interface MysqlCheckParams extends MysqlPRList {
  page?: number
  limit?: number
  orderBy?: string[]
  select?: string[] | TJ[]
  groupBy?: string[]
}
export interface FastdbCheckParams extends FastdbPRList {
  page?: number
  limit?: number
}


export interface MysqlCountParams extends MysqlPRList {
  
}
export interface MongodbCountParams extends MongodbPRList {
  limit?: 1
}
export interface FastdbCountParams extends FastdbPRList {
  limit?: 1
}
export interface CountRes {
  data: number
}

type TMongodbUpdateMethod = 'incr' | 'set' | 'unset' | 'geo' | 'append' | 'remove' | 'uAppend'
type TMysqlUpdateMethod = 'incr' | 'set' | 'unset'
type TFastdbUpdateMethod = 'incr' | 'set' | 'unset' | 'geo' | 'append' | 'remove' | 'uAppend'
type TRedisUpdateMethod = 'incr' | 'add' | 'set' | 'range' | 'endSec' | 'endMillisec' | 'endTime' | 'endMilliTime'
type dataType = string | string[] | number | number[] | boolean | boolean[] | null | undefined | {
  [propName: string] : any
} | {
  [index: number]: any
}

export type TSentence = 'sentence'

export interface MongodbUpdateParams {
  [key: string]: [TMongodbUpdateMethod, dataType] | dataType
}
export interface MysqlUpdateParams {
  [key: string]: [TMysqlUpdateMethod, dataType] | dataType
}
export interface MysqlUpdatemanyParams{
  [key: number]: {
    [keyi: string]: [TMysqlUpdateMethod, dataType] | dataType
  }
}
export interface MysqlUpdateKey{
  id?: string | number
  [key: string]: string | number
}
export interface MongodbUpdateKey{
  _id?: any
  [key: string]: string | number
}
export interface RedisUpdateParams {
  [key: string]: [TRedisUpdateMethod, dataType] | dataType
}
export interface RedisStringUpdateParams {
  [key: string]: ['incr' | 'add' | 'set' | 'range' | 'expireSec' | 'expireMillisec' | 'expireAt' | 'expireMilliAt', dataType] | dataType
}
export interface FastdbUpdateParams {
  [key: string]: [TFastdbUpdateMethod, dataType] | dataType
}


type TMongodbSetMethod = 'geo'
export interface MongodbSetParams {
  [key: string]: [TMongodbSetMethod, dataType] | dataType
}
export interface MysqlSetParams {
  [key: string]: dataType
}
export interface RedisSetQuery {
  expireSec?: number
  expireMillisec?: number
  expireAt?: number
  expireMilliAt?: number
}
export interface FastdbParams {
  [key: string]: ['geo', dataType] | dataType
}



export interface MysqlGetKey{
  [key: string]: string | number
}
export interface MongodbGetQuery {
  select?: string | string[]
}
export interface MysqlGetQuery {
  select?: string | string[]
}
export interface RedisGetQuery {
  expireSec?: boolean
  expireMillisec?: boolean
}



export interface MysqlDeleteParams extends MysqlPRList {
  page?: number
  limit?: number
}
export interface MongodbDeleteParams extends MongodbPRList {
  page?: number
  limit?: number
}

//find方法的返回
export interface MongodbFindRes {
  data: {
    objects: any[]
    [key: string]: any
  }
  [key: string]: any
}
export interface MysqlFindRes {
  data: {
    objects: any[]
    [key: string]: any
  }
  [key: string]: any
}
export interface FastdbFindRes {
  data: {
    objects: any[]
    [key: string]: any
  }
  [key: string]: any
}

//set返回
export interface MongodbSetRes {
  data: {
    acknowledged: boolean
    insertedId: any
    [key: string]: any
  }
}
export interface MysqlSetRes {
  data: {
    insertId?: string | number
    [key: string]: any
  }
  [key: string]: any
}
export interface RedisSetRes {
  data: any
  [key: string]: any
}
export interface FastdbSetRes {
  data: {
    insertId?: string | number
    [key: string]: any
  }
  [key: string]: any
}


// setmany 返回
export interface MongodbSetmanyRes {
  data: {
    acknowledged: boolean
    insertedCount: number
    insertedIds: {
      [key: string]: any
    }
    [key: string]: any
  }
}


export interface MysqlGetRes {
  data: {
    id?: string | number
    [key: string]: any
  }
  [key: string]: any
}
export interface MongodbGetRes {
  data: {
    _id: any
    [key: string]: any
  }
}
export interface RedisGetRes {
  data: {
    expireSec?: number
    expireMillisec?: number
    [key: string]: any
  }
  [key: string]: any
}
export interface FastdbGetRes {
  data: {
    id?: string | number
    [key: string]: any
  }
  [key: string]: any
}





export interface MysqlUpdateRes {
  data: {
    changedRows?: number
    [key: string]: any
  }
}
export interface MysqlUpdatemanyRes {
  data: {
    affectedRows?: number
    [key: string]: any
  }
}
export interface MongodbUpdateRes {
  data: {
    acknowledged: boolean
    modifiedCount: number
    matchedCount: number
    [key: string]: any
  }
}
export interface RedisUpdateRes {
  data: any
  [key: string]: any
}
export interface FastdbUpdateRes {
  data: {
    id?: string | number
    [key: string]: any
  }
  [key: string]: any
}



//delete
export interface MysqlDeleteRes {
  data: {
    [key: string]: any
  }
  [key: string]: any
}
export interface MongodbDeleteRes {
  data: {
    acknowledged: boolean
    deletedCount: number
    [key: string]: any
  }
}
export interface RedisDeleteRes {
  data: number
}
export interface FastdbDeleteRes {
  data: number
}


// transiction
export interface MysqlTransactionRes {
  begin: (callback: Function) => void
  run: (sql: string) => Promise<MysqlGetRes | MysqlSetRes | MysqlFindRes | MysqlDeleteRes | MysqlUpdateRes>
  rollback: Function
  commit: () => Promise<boolean>
  locks: {
    shared_locks: string
    exclusive_locks: string
  }
}



// none (key不存在)
// string (字符串)
// list (列表)
// set (集合)
// zset (有序集)
// hash (哈希表)
// redis为数据结构
export type TStructure = 'string' | 'hash' | 'list' | 
'set' | 'zset'

export interface RedisStringSet {
  [key: string]: any
}