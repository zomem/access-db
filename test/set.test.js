require('dotenv').config()
const {mysql, mongodb, redis} = require('../lib/index')


const TABLE = {
  set_test: 'set_test'
}


test('set test: ', async () => {
  return
  // const res1 = await mysql.set(TABLE.set_test, {
  //   title: '标题',
  //   count: 32,
  //   create_at: '2021-05-16 22:41:02'
  // })
  // const res2 = await mongodb.set(TABLE.set_test, {
  //   title: '标题',
  //   count: 32,
  //   create_at: '2021-05-16 22:41:02'
  // })
  // expect(res1.data.insertId).toBeDefined()
  // expect(res2.data.insertedId).toBeDefined()

  const redisRes = await redis.set('String', {
    title: 'one title'
  })
  console.log('title0000', redisRes)


  //expect(res2.data.insertedId).toBeDefined()
})