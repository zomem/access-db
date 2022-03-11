require('dotenv').config()


const {mongodb} = require('../lib/index')
const DATA = require('./data/mongodb.json')


const table = {
  users: 'users'
}





test('mongodb: ', async () => {
  return
  console.time('settime')
  const temp = await mongodb.set(table.users, {
    ...DATA[0],
    created_at: new Date()
  })
  const obj = await mongodb.get(table.users, "fjeu936f29fbdbb22a960cba")
  await mongodb.del(table.users, 'fjeu936f29fbdbb22a960cba')


  await mongodb.setmany(table.users, DATA)
  const list = (await mongodb.find(table.users)).data.objects
  let ids = []
  for(let j = 0; j < list.length; j++){
    ids.push(list[j]._id)
  }
  await mongodb.updatemany(table.users, '_id', [
    {
      _id: list[0]._id,
      age: ['incr', 10],
    },
    {
      _id: list[1]._id,
      age: 1,
      name: '更新的'
    },
    {
      _id: '621593dae456798bd6eee5f4',
      age: 112,
      name: '小红222222'
    }
  ])
  await mongodb.updatemany(table.users, ['age', 'name'], [
    {
      name: '小明',
      age: 32,
      title: 'title'
    },
    {
      age: 17,
      name: '小白',
      title: '323'
    }
  ])
  // await mongodb.delmany(table.users, ids)


  // await mongodb.setmany(table.users, DATA)
  // const list2 = (await mongodb.find(table.users)).data.objects
  // let ages = []
  // for(let j = 0; j < list2.length; j++){
  //   if(list2[j].age < 20){
  //     ages.push({age: list2[j].age})
  //   }
  // }
  // await mongodb.delmany(table.users, ages)

  console.timeEnd('settime')

  console.log('list', list)

  
  //expect(res2.data.insertedId).toBeDefined()
})

