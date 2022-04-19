const { elasticsearch } = require('../lib/index')

// jest.setTimeout(500000)


test('elasticsearch: ', async () => {
  return
  
  // let res = await elasticsearch.set('users', {
  //   "name":"huawei p30",
  //   "price": 3200,
  //   "color":"white",
  //   "ad":"red good game",
  //   "des": "这是一部手机",
  //   "label":["白","华为"]
  // })
  // console.log(res.data._id)
  // console.log(res)

  let getRes = await elasticsearch.get('users', 'gab')
  console.log('getResssss>>>>', getRes)



  // await elasticsearch.update('users', 'gab', {
  //   list2: ['uAppend', [8, 9]],
  //   age: ['incr', 1],
  //   name: ['unset'],
  //   geo: ['geo', [1, 1]],
  //   geo_area: ['geo', [1, 2], [3, 4], [3, 5], [1, 2]],
  //   list: ['remove', ['a', 'b']]
  // })


  // let getRes2 = await elasticsearch.get('users', 'gab')
  // console.log('getRess22222>>>', getRes2)

  let findRes = await elasticsearch.find('users', {
    p0: ['des', 'match', '一部红色'],
    p2: ['ad', 'match', 'is'],
    p1: ['price', '>=', 5000],
    // p3: ['price', '<=', 6000],
    // p4: ['price', '=', 3200],
    r: 'p0 && p1 && p2',
    page: 1,
    limit: 6,
  })
  console.log('测试find,,', findRes.data)


})

