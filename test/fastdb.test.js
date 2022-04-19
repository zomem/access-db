const {fastdb} = require('../lib/index')

// jest.setTimeout(500000)

test('fastdb: ', async () => {
  return
  // for(let i = 0; i < 1000; i++){

  // }

  console.time('fastdbSet')
  fastdb.set('users', {
    name: 'ewa',
    weight: Math.random() * 1000,
    nmdd: '晨革工地基地asdf工顶起工夺工顶起工顶起asdsdf要大规模夺要夺。。'
  })
  console.timeEnd('fastdbSet')

  console.time('fastdbFind')
  let find = fastdb.find('users', {
    p0: ['weight', '<', 50],
    p2: ['weight', '>', 48],
    r: 'p2',
    limit: 5,
    page: 1
  }).data.objects
  console.timeEnd('fastdbFind')
  console.log('findddd', find)

  console.time('fastdbFind2')
  let find2 = fastdb.find('users', {
    p0: ['weight', '<', 50],
    p2: ['weight', '>', 48],
    r: 'p2',
    limit: 5,
    page: 1,
    orderBy: ['-weight']
  }).data.objects
  console.timeEnd('fastdbFind2')
  console.log('findddd2', find2)

  // console.time('fastset')
  // fastdb.set('users', {
  //   name: '3333',
  //   weight: 2,
  //   like: ',,,f'
  // })
  // console.timeEnd('fastset')

  console.time('fastdbCount')
  let num = fastdb.count('users').data
  console.timeEnd('fastdbCount')
  console.log('count', num)
})

