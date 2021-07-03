/*
 * @Author: your name
 * @Date: 2020-05-18 18:02:23
 * @LastEditTime: 2020-06-06 08:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /@minappjs/weapp/src/count.ts
 */ 
import fetchFind from './find'
import {TTable, IMysqlCountParams, IMysqlFindRes, TSentence, ICountRes} from '../index'


function fetchCount(table: TTable, params: IMysqlCountParams): Promise<ICountRes>
function fetchCount(table: TTable, params: IMysqlCountParams, query: TSentence): Promise<string>
function fetchCount(table: TTable, params: IMysqlCountParams, query?: TSentence): Promise<ICountRes | string>{
  return new Promise((resolve, reject)=>{
    //mysql类
    params.limit = 1
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
      }).then((res: IMysqlFindRes) => {
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