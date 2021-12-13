const hrtime = require('process').hrtime

const start = hrtime.bigint();

let arr = []

console.time('for')
for(let i = 0; i < 10000000; i++){
 arr.push(i)
}
console.timeEnd('for')