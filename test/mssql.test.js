
const {mssql} = require('../lib/index')


test('mssql test: ', async () => {
  // let setRes = await mssql.set('dbo.book', {
  //   title: '钢铁是怎么样8823',
  //   author: 'TTU',
  //   price: 90
  // })

  // console.log('setREs', setRes.data)

  let getRes = await mssql.get('dbo.book', 3)
  let getRes2 = await mssql.get('dbo.book', {author: 'jiava5'})

  console.log('getRES', getRes.data, getRes2.data)

  let updateRes = await mssql.update('dbo.book', 3, {
    author: 'Stanf',
    price: ['incr', 10]
  })
  let updateRes2 = await mssql.update('dbo.book', {author: 'jiava5'}, {
    title: '第五本书',
    price: ['unset', '']
  })

  console.log('update>>>>>', updateRes, updateRes2)

  // let delRes = await mssql.del('dbo.book', {author: 'mai2'})

  // console.log('delRES', delRes.data)

  let findRes = await mssql.find('dbo.book', {
    p0: ['price', '>', 100],
    r: 'p0'
  })

  console.log('findRES', findRes.data.objects)

  let countRes = await mssql.count('dbo.book', {
    p0: ['price', '>', 100],
    r: 'p0'
  })

  console.log('countRes', countRes.data)

  // let setManyRes = await mssql.setmany('dbo.book', [
  //   {
  //     title: '批量新增1',
  //     author: 'pil',
  //     price: 88
  //   },
  //   {
  //     title: '批量新增2',
  //     author: 'pilii',
  //     price: 98
  //   },
  //   {
  //     title: '批量新增3',
  //     author: 'boka',
  //     price: 120
  //   },
  // ])

  // console.log('setMany', setManyRes.data)

  // let upmanyRes = await mssql.updatemany('dbo.book', 'id', [
  //   {
  //     id: '24',
  //     title: '更新了24',
  //     price: ['incr', 100]
  //   },
  //   {
  //     id: '25',
  //     title: '更新了25',
  //     price: ['incr', 10]
  //   },
  //   {
  //     id: '26',
  //     title: '更新了26',
  //     price: ['incr', 12]
  //   },
  // ])

  // console.log('mannnnnyy', upmanyRes.data)


})

