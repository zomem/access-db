require('dotenv').config()
const {fastdb} = require('../lib/index')




test('fastdb set test: ', async () => {
  return
  let oneId = ''
  console.time('fastSetTime')
  let temp = fastdb.set('test', {
    title: '这是一个标题',
    name: 'onename',
    age: 32,
    arr: ['a', 'b', 'c'],
    obj: {name: 23},
    geop: ['geo', [32, 2]],
    geops: ['geo', [32, 33], [1,2], [2, 3], [32, 33]]
  })
  console.timeEnd('fastSetTime')

  oneId = temp.data.insertId

  fastdb.set('test', {
    id: '6ynbowd59q0hmkq220svkhumk',
    title: '这是一个标题',
    name: 'onename',
    age: 32,
    arr: ['a', 'b', 'c'],
    obj: {name: 23},
    geop: ['geo', [32, 2]],
    geops: ['geo', [32, 33], [1,2], [2, 3], [32, 33]]
  })
  console.log('set id >>> ', oneId)

  // for(let i = 0; i < 10000; i++){
  //   fastdb.set('many', {
  //     title: 'one title',
  //     name: 'onename',
  //     obj: {
  //       a: {name: '99'},
  //       b: 32,
  //       c: 'time'
  //     },
  //     list: [
  //       {
  //         user: 'aaaa',
  //         name: 'ffff',
  //         age: 32
  //       },
  //       {
  //         user: 'bbbb',
  //         name: 'nnadf',
  //         age: 43
  //       }
  //     ]
  //   })
  // }
  let {data} = fastdb.set('test', {
    title: 'one title',
    name: 'onename',
    obj: {
      a: {name: '99'},
      b: 32,
      c: 'time'
    },
    list: [
      {
        user: 'aaaa',
        name: 'ffff',
        age: 32
      },
      {
        user: 'bbbb',
        name: 'nnadf',
        age: 43
      }
    ]
  })
  
  console.time('fastdbGetTime')
  fastdb.set('test', {
    id: '7h1bowd5cml2pkq220svplv20',
    title: 'one title',
    name: 'onename',
    obj: {
      a: {name: '99'},
      b: 32,
      c: 'time'
    },
    list: [
      {
        user: 'aaaa',
        name: 'ffff',
        age: 32
      },
      {
        user: 'bbbb',
        name: 'nnadf',
        age: 43
      }
    ]
  })
  let res1 = fastdb.get('test', oneId)   //  1g1gziale8t8kpxrnb2b4q8t8   5443
  console.timeEnd('fastdbGetTime')
  console.log('g1 ========  ', res1.data)

  //expect(res2.data.insertedId).toBeDefined()
})


test('fastdb update test: ', async () => {
  return
  console.time('fastdbUpdateTime')
  let up2 = fastdb.update('test', '7h1bowd5cml2pkq220svplv20', {
    'obj.b': ['incr', 10],
    'obj.a.name': 'newA',
    'obj.a.book': 'book name',
    arr: [1, 2, 5],
    name: 'fastdb',
    geoo: ['geo', [1,1], [34, 32], [22, 33], [1,1]],
    gone: ['geo', [3,3]]
  })
  console.timeEnd('fastdbUpdateTime')
  console.log('up2>>>>', up2.data)

  let up3 = fastdb.update('test', '6ynbowd59q0hmkq220svkhumk', {
    // arr: ['append', ['fa', 'c', 'b', 'a', 8]]
    // arr: ['uAppend', ['yy', 8, 2, 'b']]
    arr: ['unset'],
    age: ['incr', -2]
  })
  console.log('up3 ', up3.data)
  
  //expect(res2.data.insertedId).toBeDefined()
})



test('fastdb find test: ', async () => {
  return
  // console.time('count_time')
  // let count = fastdb.count('test', {
  //   p0: ['age', '=', 32],
  //   r: 'p0'
  // })
  // console.timeEnd('count_time')
  // console.log('count结果', count)


  console.time('fastdbFindTime')
  // let fres = fastdb.find('test', {
  //   p0: ['age', '=', 32],
  //   p1: ['title', '=', '这'],
  //   r: 'p0',
  //   limit: 2,
  //   page: 2,
  // })
  // console.log('find结果 ', fres.data)

  let f2 = fastdb.find('test', {
    p0: ['obj.a.name', '=', 'newA'],
    p1: ['age', '<=', 30],
    r: 'p0 || p1',
  })

  console.timeEnd('fastdbFindTime')
  console.log('find 22 结果 》》》', f2.data.objects)
  
  //expect(res2.data.insertedId).toBeDefined()
})