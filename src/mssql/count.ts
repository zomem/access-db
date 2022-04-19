/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@minappjs/weapp/src/count.ts
 */ 
import fetchFind from './find'
import {TTable, MysqlCountParams, MysqlFindRes, TSentence, CountRes} from '../index'


function fetchCount(table: TTable, params: MysqlCountParams): Promise<CountRes>
function fetchCount(table: TTable, params: MysqlCountParams, query: TSentence): Promise<string>
function fetchCount(table: TTable, params: MysqlCountParams = {}, query?: TSentence): Promise<CountRes | string>{
  return new Promise((resolve, reject)=>{
    //mysql类
    if(query === 'sentence'){
      fetchFind(table, {
        j0: ['*', 'count'],
        ...params,
        select: ['j0'],
      }, 'sentence').then((res: string) => {
        resolve(res)
      }, err=>{
        reject(err)
      })
    }else{
      fetchFind(table, {
        j0: ['*', 'count'],
        ...params,
        select: ['j0']
      }).then((res: MysqlFindRes) => {
        let num: number = 0
        if(res.data.objects.length > 0){
          num = parseInt(res.data.objects[0].j0)
        }
        resolve({data: num})
      }, err=>{
        reject(err)
      })
    }
  })
}


export default fetchCount