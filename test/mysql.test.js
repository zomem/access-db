require('dotenv').config()

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
  let num = (await mysql.count('money', {
    p0: ['uid', '>', 1],
    r: 'p0'
  })).data
  let sql = await mysql.count('money', {
    p0: ['uid', '>', 1],
    r: 'p0'
  }, 'sentence')
  console.log('数据计数：：：', num, sql)
  return

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


const wait = async () => {
  
}
const timeSp = async (t) => {
  return new Promise((resolve, reject) => {
    if(t){
      setTimeout(() => {
        resolve('ok')
      }, 3000);
    }else{
      setTimeout(() => {
        reject('time errsa')
      }, 3000);
    }
  })
}



test.concurrent('mysql_transition_test: ', async () => {
  console.log('++++++++++++++++++')
  async function one(i) {
    const {begin, commit, rollback, run, locks} = await mysql.transaction()
  
    await begin(async () => {
      try{
        const book_id = 1
        let tempdata = (await run(await mysql.get('book', book_id, {}, 'sentence') + locks.exclusive_locks)).data
        
        await run(await mysql.update('book', book_id, {num: ['incr', -1]}, 'sentence'))
        console.log('111111111,,,,,,,,,', i)
        

        await run(await mysql.update('money', 1, {money: ['incr', -tempdata.price]}, 'sentence'))
        //await timeSp(true)
        // if(i === 20){
        //   console.log('22020202020202020202020202020')
        //   return await rollback()
        // }

        await run(await mysql.update('money', 2, {money: ['incr', tempdata.price]}, 'sentence'))
        
        
        if(tempdata.num < 1){
          console.log('samll>>>>>>>>>>>>')
          return await rollback()
        }


        console.log('333333333')
        // await timeSp(0)
        // if(1 > 0){
        //   console.log('iffff')
        //   return await rollback()
        // }
        await commit()
        console.log('444444444')
      }catch(err){
        console.log('555555555', err)
        await rollback()
        throw new Error('errrrr', err)
      }
    })
  }

  for(let i = 0; i < 2; i++){
    await one(i)
  }

}, 15000)
