require('dotenv').config()


const {mongodb} = require('../lib/index')
const DATA = require('./data/mongodb.json')


const table = {
  users: 'users'
}





test('mongodb: ', async () => {

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
  await mongodb.delmany(table.users, ids)


  await mongodb.setmany(table.users, DATA)
  const list2 = (await mongodb.find(table.users)).data.objects
  let ages = []
  for(let j = 0; j < list2.length; j++){
    if(list2[j].age < 20){
      ages.push({age: list2[j].age})
    }
  }
  await mongodb.delmany(table.users, ages)

  console.timeEnd('settime')

  
  console.log('temp', temp.data)
  console.log('obj', obj.data)
  
  //expect(res2.data.insertedId).toBeDefined()
})

