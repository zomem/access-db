require('dotenv').config()
const {redis} = require('../lib/index')
const DATA = require('./data/redis.json')
const PARAMS = require('./data/redismany.json')


jest.setTimeout(50000)
test('redis: ', async () => {




  return

  /** 队列 */
  const resQu = await redis.queue('name', 'push', ['222'])
  const resQu2 = await redis.queue('name', 'pop', 3)

  const resQu3 = await redis.queue('name', 'remove', ['tt', '8'])

  console.log('resQu<<<<>>>>', resQu)
  console.log('resQu<<<<>>>>222', resQu2)
  console.log('resQu<<<<>>>>333', resQu3)



  /** 订阅 */
  await redis.subscribe(['cc'], (channel, message) => {
    console.log('channel:sub::', channel, message)
  })
  

  setTimeout(async () => {
    await redis.publish('cc', 'this is a message. 一条')
  }, 5000);
  return

  const {begin, commit, watch, discard} = await redis.transaction()

  const id = '1646978880916623577462067916'
  let r2 = await redis.get('a', id)
  console.log('rrrrrrrr9922222rr', r2)
  await watch('a', id)
  await begin(async () => {
    console.log('bbbbbbe')
    //await redis.set('a', {name: 'wzj'})

    await redis.get('a', id)
    await redis.update('a', id, {age: ['incr', 3]})
    if(id){
      return await discard()
    }
    setTimeout(async () => {
      let rrr = await commit()
    }, 5000);
  })

  /** redis.set */ 
  let id2 = ''
  
  for(let i = 0; i < DATA.length; i++){
    let setRes0, setRes2
    let tempId = DATA[i].params.id
    let tempExpire = DATA[i]._expire
    if(tempId){
      setRes0 = await redis.set(DATA[i].table, DATA[i].params)
      expect(setRes0.data.insertId).toEqual(`${tempId}`)
    }
    if(tempExpire){
      setRes2 = await redis.set(DATA[i].table, DATA[i].params, tempExpire)
      id2 = setRes2.data.insertId
      expect(setRes2.data.insertId).toBeDefined()
    }
  }

  
  /** redis.get */ 
  let id0 = DATA[0].params.id
  let getRes0 = await redis.get(DATA[0].table, id0)
  expect(getRes0.data._expire).toBe(-1)
  expect(getRes0.data.id).toEqual(`${DATA[0].params.id}`)
  expect(getRes0.data.weight).toEqual(`${DATA[0].params.weight}`)

  let getRes2 = await redis.get(DATA[2].table, id2)
  expect(getRes2.data._expire).toBeGreaterThan(DATA[2]._expire - 2000)

  /*** redis.update  */
  await redis.update(DATA[2].table, id2, {
    nickname: '用户昵称',
    like: 'abc',
  })
  getRes2 = await redis.get(DATA[2].table, id2)
  expect(getRes2.data.like).toEqual('abc')
  expect(getRes2.data.nickname).toEqual('用户昵称')

  await redis.update(DATA[2].table, id0, {
    like: 666,
  }, 50000)
  getRes0 = await redis.get(DATA[2].table, id0)
  expect(getRes0.data.like).toEqual('666')
  expect(getRes0.data._expire).toBeGreaterThan(50000 - 2000)

  await redis.update(DATA[2].table, id0, {
    like: ['incr', 100],
    weight: ['incr', -30.2]
  })
  getRes0 = await redis.get(DATA[2].table, id0)
  expect(getRes0.data.like).toEqual('766')
  expect(parseFloat(getRes0.data.weight).toFixed(1)).toEqual('15.6')

  await redis.update(DATA[2].table, id0, {
    avatar_url: ['unset']
  })
  getRes0 = await redis.get(DATA[2].table, id0)
  expect(getRes0.data.avatar_url).toBeUndefined()


  /** redis.find count */
  console.time('redis.find')
  let findRes = await redis.find(DATA[0].table, {
    p0: ['weight', '>', 40],
    r: 'p0',
    limit: 4, 
    page: 1
  })
  console.timeEnd('redis.find')
  let num0 = await redis.count(DATA[0].table, {
    p0: ['weight', '>', 40],
    r: 'p0',
  })
  console.log('redis find ', findRes.data.objects)
  let num = (await redis.count(DATA[0].table)).data
  console.log('redis count', num, num0)

  await redis.del(DATA[0].table, id0)
  await redis.delmany(DATA[0].table, [DATA[1].params.id, id2])


  /** redis.setmany */
  await redis.setmany('books', PARAMS)
  let findManyRes = await redis.find('books')
  
  let datat = findManyRes.data.objects, allids = []
  for(let i = 0; i < datat.length; i++){
    allids.push(datat[i].id)
  }

  
  findManyRes = await redis.find('books', {
    p0: ['weight', '<', '2231.567'],
    p1: ['weight', '>', 100],
    p2: ['nickname', 'in', ['下哦哦4']],
    r: 'p0 && p1 && p2',
    orderBy: ['-weight']
  })
  
  expect((await redis.count('books', {
    p0: ['weight', '<', '2231.567'],
    p1: ['weight', '>', 100],
    p2: ['nickname', 'in', ['下哦哦4']],
    r: 'p0 && p1 && p2',
  })).data).toBe(26)

  let num2 = (await redis.count('books')).data
  console.log('redis many count: ', num2)
  expect(num2).toBe(13200)
  
  await redis.delmany('books', allids)
  await redis.delmany('users', [4, 5, 6, 7])

})