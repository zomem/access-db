/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:45:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /@minappjs/weapp/src/constants/constants.ts
 */ 

export const PLATFORM_NAME = {
  MONGODB: 'mongodb',     //MongoDB 数据库
  MYSQL: 'mysql',         //mysql 数据库
  REDIS: 'redis',         //redis 数据库
  FASTDB: 'fastdb'        //json本地 
}



//更新数据的方法
export const MONGODB_UPDATE_METHORD = ['incr', 'set', 'unset', 'geo', 'append', 'remove', 'uAppend']
export const MYSQL_UPDATE_METHORD = ['incr', 'set', 'unset']
export const REDIS_UPDATE_METHORD = ['incr', 'add', 'set', 'unset', 'range', 'expireSec', 'expireMillisec', 'expireAt', 'expireMilliAt']
export const FASTDB_UPDATE_METHORD = ['incr', 'set', 'unset', 'geo', 'append', 'remove', 'uAppend']


//新增数据方法
export const SET_METHORD = [
  'geo'
]

export const J_MAX = 10   // j*  参数的最大少于个数
export const J_NAME_LIST = ['j0', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9']


// redis 
export const REDIS_STRUCTURE = {
  string: 'string'
}