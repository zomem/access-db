
const fs = require('fs')

// console.time('ttt')
// let hrt = process.hrtime()

// let nowTime = new Date().getTime()

// let ran = (Math.random() * 10000 + 2) >>> 0
// let ran2 = (Math.random() * 1000 + 1) >>> 0
// let sl = (Math.random() * 10 + 5) >>> 0

// let a = (ran.toString(36) + hrt[0].toString(36) + hrt[1].toString(36) + nowTime.toString(36) + ran2.toString(36))

// let s = (a + a.slice(-sl)).substr(0, 25)

// console.timeEnd('ttt')
// console.log(hrt)
// console.log(s)
// console.log(s.length)


// let oldBuf = fs.readFileSync('../fastdata/b.json')

// console.log('oldBuf string   ', oldBuf.length)

// let isHave = oldBuf.includes(`"_fast_id":"2cofdx2c7m70kpxqev54j6xqe"`)
// console.log('isHave>>>>><<<<<    ', isHave)


// let start = oldBuf.indexOf(`{"_fast_id":"2cofdx2c7m70kpxqev54j6xqe"`)
// if(start === -1){
//   // 没有
//   return
// }
// let end = oldBuf.indexOf(`,{"_fast_id"`, start + 10)
// if(end === -1){
//   end = oldBuf.length - 1
// }

// let result = oldBuf.slice(start, end)


// console.log('start:   ', start)
// console.log('end  ', end)

// console.log('result:>>>   ', JSON.parse(result.toString()))






/** find */

let buf = Buffer.from(`my name is one name abc`)
let tempB = Buffer.from('name,')
console.log(buf.indexOf(tempB, 15))
console.log(buf.lastIndexOf(tempB, 3))

console.log(buf.slice(1, 4))
console.log(buf.slice(1, 4).toString())