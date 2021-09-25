require('dotenv').config()

const { ObjectId } = require('mongodb')
const {mongodb} = require('../lib/index')


const SETTIME = 'settime'

const TABLE_1 = 'test'

const DATA_1 = {
  title: '同工 工工',
  name: 'ifma',
  age: '9l',
  arr: [],
  obj: {},
  geop: ['geo', [3, 2]],
  geops: ['geo', [13, 33], [1,2], [2, 3], [13, 33]],
  create_at: new Date(),
}
const DATA_M = [
  {
    title: '这',
    name: 'ond',
    age: 2,
    arr: ['a', 'c'],
  },
  {
    title: '这晨',
    name: 'asdf',
    age: 12,
    arr: ['a', 'cc'],
  },
  {
    title: '革载',
    name: 'te',
    age: 22,
    arr: ['aa', 'c'],
  }
]



test('mongodb_set_test: ', async () => {

  return
  console.time(SETTIME)
  const temp = await mongodb.set(TABLE_1, DATA_1)
  // const temp2 = await mongodb.setmany(TABLE_1, DATA_M)
  
  
  // const temp = await mongodb.update(TABLE_1, '6128936f29fbdbb22a960cba', {
  //   age: ['unset', 30],
  // })
  // const temp = await mongodb.update(TABLE_1, {name: 'asdf66666'}, {
  //   age: 15
  // })

  // const temp = await mongodb.get(TABLE_1, {
  //   name: 'te'
  // })

  // const temp = await mongodb.count(TABLE_1)

  // const temp = await mongodb.find(TABLE_1)

  // const temp = await mongodb.find(TABLE_1)

  console.timeEnd(SETTIME)

  
  console.log('iddddd', temp.data)
  
  //expect(res2.data.insertedId).toBeDefined()
})

