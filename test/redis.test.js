require('dotenv').config()
const {redis} = require('../lib/index')


test('redis set/get Sting test: ', async () => {
  
  return
  
  let rd = await redis.del(['title', 'a', 'b', 'c', 'num', 'user', 'user2', 'user3', 'user4', 'timePass'])
  console.log('del@: ', rd.data)

  console.time('redisSet')
  const r1 = await redis.set('string', {
    title: 'abc111',
  })
  console.timeEnd('redisSet')
  expect(r1.data).toBe(1)
  const r11 = await redis.set('string', {
    title: 'abc888_by_notExist',
    title2: 'title2'
  })  //都不保存，如果其中有一个存在
  expect(r11.data).toBe(0)


  const rr = await redis.set('string', {
    num: 3,
  })
  expect(rr.data).toBe(1)
  const g0 = await redis.get('string', 'title')
  expect(g0.data.title).toBe('abc111')
  const g1 = await redis.get('string', ['title', 'num'])
  expect(g1.data.title).toBe('abc111')
  expect(g1.data.num).toBe('3')
  

  const r3 = await redis.set('string', {
    user: {
      nickname: 'wzj888',
      age: 12888,
    },
  })
  console.log('r3', r3)
  expect(r3.data).toBe(1)

  await redis.set('string', {
    user2: {
      nickname: 'zhao',
      age: 23,
    },
  }, {seconds: 20})
  await redis.set('string', {
    user3: 'u3',
    user4: 'user4'
  }, {seconds: 15})

  const r333 = await redis.set('string', {
    timePass: 'atime'
  }, {milliseconds: 5000})
  expect(r333.data).toBe(1)

  
  const r4 = await redis.set('string', {
    a: 'aa',
    b: 323,
    c: {
      c1: 'c111',
      c3: 43,
      c2: {
        c21: 'c2121',
        c22: {
          cc: 'cc'
        }
      }
    }
  })
  expect(r4.data).toBe(1)
  const get0 = await redis.get('string', ['a', 'b', 'c'], {expireSec: true})
  console.log('get多个值： ', get0.data)
  expect(get0.data.a).toEqual('aa')
  expect(get0.data.expireSec.a).toEqual(-1)
})


test('redis update string test', async () => {
  return
  
  await redis.del(['update_title', 'setStr', 'tim', 'tim2'])

  /** set */
  await redis.set('string', {
    setStr: 'str'
  })
  await redis.update('string', {
    setStr: 'str2'
  })
  let rb2 = await redis.get('string', 'setStr')
  expect(rb2.data.setStr).toBe('str2')


  /** add */
  let r8 = await redis.update('string', {
    update_title: 'one',
  })
  let ra = await redis.update('string', {
    update_title: ['add', ' !!!']
  })
  // one !!!
  expect(ra.data).toBe(7)
  let rb = await redis.get('string', ['update_title'])
  expect(rb.data.update_title).toBe('one !!!')

  let tim = await redis.set('string', {
    tim: 'abc'
  }, {expireSec: 100})
  console.log('set一个过期时间为100s的key ：', tim)
  let v = await redis.get('string', 'tim')
  console.log('值： ', v)
  let t = await redis.get('string', 'tim', {expireSec: true})
  console.log('过期时间： ', t)
  await redis.update('string', {
    tim: ['expireSec', 200]
  })
  let t1 = await redis.get('string', 'tim', {expireSec: true})
  console.log('更新后的过期时间： ', t1)



  let tim2 = await redis.set('string', {
    tim2: 'abc66'
  }, {expireSec: 90})
  console.log('set一个过期时间为122000ms的key ：', tim2)
  let v2 = await redis.get('string', 'tim2')
  console.log('值2： ', v2)
  let t2 = await redis.get('string', 'tim2', {expireMillisec: true})
  console.log('过期时间2： ', t2)
  let tm = await redis.update('string', {
    tim2: ['expireAt', 1626966468]
  })
  console.log('更新时间2', tm)
  let t12 = await redis.get('string', 'tim2', {expireSec: true})
  console.log('更新后的过期时间2： ', t12)



})