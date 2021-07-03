
import {mysql, mongodb, redis} from '../lib/index'
 

/** mysql 的事务 和 锁 */
let {run, begin, rollback, commit} = await mysql.transaction()

let sql1 = await mysql.get('user', 10, 'sentence')
let sql2 = await mysql.update('user', 10, {money: ['incr', -3]}, 'sentence')
let sql3 = await mysql.update('user', 12, {money: ['incr', 3]}, 'sentence')

await begin(async () => {
  try{
    let res1 = (await run(sql1)) + locks.exclusive_locks
    if(res1.data.money < 3){
      return await rollback()
    }
    await run(sql2)
    await run(sql3)
    await commit()
  }catch(err){
    await rollback()
    throw new Error(err)
  }
})




/** redis set */
mongodb.set('ttt', {})
mysql.set('ttt', {},)
redis.set('String', {
  name: 'aaa'
}, {whenExist: 0})

redis.set('Hash', {
  user: {
    name: 'w',
    token: 'kak'
  }
}, 50)

redis.set('List', {
  tags: ['aa', 'bb']
}, 9)