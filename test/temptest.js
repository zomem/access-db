
const word = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j'
]

const str1 = 'abcdefghijklmnopqrst'

const buf1 = Buffer.from('abcdefghijklmnopqrst')




const word1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',]
// const word1 = 'abcdefghij'

const word2 = ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't']
// const word2 = 'klmnopqrst'


// 以hrTime为随机的hash
function timeHash(){
  let hrTime = process.hrtime()
  console.log('hrTime>>>> ', hrTime)
  console.time('TIME_T')
  let sec = hrTime[0]
  let nano = hrTime[1]
  let hash = ''

  for(let i = 0; i < 5; i++){
    let n = ((sec % (10 * (10 ** i))) / (10 ** i)) >>> 0
    hash = hash + word1[n]
  }

  for(let i = 0; i < 9; i++){
    let n = ((nano % (10 * (10 ** i))) / (10 ** i)) >>> 0
    hash = hash + word2[n]
  }
  
  console.timeEnd('TIME_T')
  console.log('hash', hash)
}
timeHash()









// 以hrTime为随机的hash
const obj = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  '3': 'd',
  '4': 'e',
  '5': 'f',
  '6': 'g',
  '7': 'h',
  '8': 'i',
  '9': 'j',
}
function timeHash2(){
  let [sec, nano] = process.hrtime()
  console.time('TIME_T2')
  let hash = ''
  let str = `${nano}${sec}`
  for(let i = 0; i < str.length; i++){
    hash += word[str[i]] || 'x'
  }
  
  console.timeEnd('TIME_T2')
  console.log('hash', str, hash)
}

timeHash2()



