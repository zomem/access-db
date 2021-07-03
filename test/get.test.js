require('dotenv').config()
const {mysql, mongodb} = require('../lib/index')


const TABLE = {
  get_test: 'get_test'
}



test('get test: ', async () => {
  return
  const mysql_res1 = await mysql.get(TABLE.get_test, 1)
  const mysql_res2 = await mysql.get(TABLE.get_test, {name_uni: 't01'})


  const mongodb_res1 = await mongodb.get(TABLE.get_test, '60a8e5319292c51ef4ab4ee9')


  expect(mysql_res1.data.all_num).toEqual(2)
  expect(mysql_res2.data.all_num).toEqual(2)

  expect(mongodb_res1.data.title).toBe('凳子')
})