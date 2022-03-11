require('dotenv').config()
const { elasticsearch } = require('../lib/index')

// jest.setTimeout(500000)

test('elasticsearch: ', async () => {
  return
  let res = await elasticsearch.set('users', {
    _id: 'uskaidfjllll',
    name: 'wzj',
    age: 28,
  })

  console.log(res.data._id)
  console.log(res)
})

