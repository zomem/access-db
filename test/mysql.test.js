require('dotenv').config()

const {mysql} = require('../lib/index')




test('mysql test: ', async () => {
  return
  // await mysql.set('book', {
  //   title: "m'y",
  //   num: 23,
  //   price: 32.23
  // })
  // await mysql.set('book', {
  //   title: `m'y",,a#@!@$$^&^%&&#$,,adflll+_)(_)*)(32389)`,
  //   num: 23,
  //   price: 32.23
  // })
  await mysql.update('book',  {id: 8},{
    title: `m'y",,a#@!@$$^&^%&&#$,,adflll+_)(_)*)(32389)`,
    num:1110,
    price: 32.23
  })
  // await mysql.update('book')
  let a = await mysql.find('book', {
    p0: ['title', 'like', `%m'y",,a#@!@$$^&^%&%`],
    r: 'p0'
  })
  // console.log('aaaa', a)
  console.log('aaaa', a.data.objects)
  await mysql.del('book', {title: `m'y",,a#@!@$$^&^%&&#$,,adflll+_)(_)*)(32389)`})
  

  return
  let num = (await mysql.count('money', {
    p0: ['uid', '>', 1],
    r: 'p0'
  })).data
  let sql = await mysql.count('money', {
    p0: ['uid', '>', 1],
    r: 'p0'
  }, 'sentence')
  console.log('数据计数：：：', num, sql)

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

  let tempGet = await mysql.get('test', 4, {select: ['name']})
  console.log('1111', tempGet)
  tempGet = await mysql.get('test', 4)
  console.log('2222', tempGet)
  tempGet = await mysql.get('test', 4, {}, 'sentence')
  console.log('3333', tempGet)
  tempGet = await mysql.get('test', 4, {select: ['name']}, 'sentence')
  console.log('4444', tempGet)
  tempGet = await mysql.get('test', 4, 'sentence')
  console.log('5555', tempGet)


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
  return
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
