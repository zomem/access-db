const hrtime = require('process').hrtime

const start = hrtime.bigint();

const {mysql} = require('../lib/index')

let tempa = process.argv.splice(2)[0]
console.log('tempaaaaa', tempa)


const getUser = (t) => {
  console.log('uuuuuuuuuuuuuuuu', t)


  let list = [{_id: '3333', name: 'qaa'}]
  console.log(list)
  let list2 = JSON.parse(JSON.stringify(list))
  delete list[0]._id
  console.log(list)
  console.log(list2)
}
getUser(tempa)



var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('some_event', function(e) { 
    console.log('some_event 事件触发', e); 
}); 
setTimeout(function() { 
    event.emit('some_event'); 
}, 1000);


