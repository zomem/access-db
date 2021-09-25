require('dotenv').config()

const { ObjectId } = require('mongodb')
const {mysql} = require('../lib/index')


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



test('mysql_updatemany_test: ', async () => {

  let res2 = await mysql.updatemany('test', ['id', 'code'], [
    {
      id: 1,
      code: 11,
      name: 'nam',
      book: 'boo'
    },
    {
      id: 2,
      code: '22',
      name: 'nam',
      book: 'boo'
    },
    {
      id: 3,
      code: '33',
      name: 'nam',
      book: 'boo'
    },
    {
      id: 4,
      code: '44',
      name: 'nam',
      book: 'boo'
    },
    {
      id: 5,
      code: '66',
      name: 'nam',
      book: 'boo'
    }
  ])
  console.log('rrrr2222', res2)


  let res = await mysql.updatemany('test', ['id', 'code'], [
    {
      id: 4,
      code: 44,
      name: 'ssss',
    },
    {
      id: 7,
      code: '77',
      name: 'qqq'
    }
  ], 'sentence')
  console.log('reeeeeeee', res)
  // data: {
  //   fieldCount: 0,
  //   affectedRows: 2,
  //   insertId: 0,
  //   serverStatus: 34,
  //   warningCount: 0,
  //   message: '(Rows matched: 2  Changed: 2  Warnings: 0',
  //   protocol41: true,
  //   changedRows: 2
  // }

})




