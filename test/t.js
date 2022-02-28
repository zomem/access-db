const hrtime = require('process').hrtime

const start = hrtime.bigint();

const {mysql} = require('../lib/index')

let tempa = process.argv.splice(2)[0]
console.log('tempaaaaa', tempa)


const getUser = (t) => {
  console.log('uuuuuuuuuuuuuuuu', t)
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


