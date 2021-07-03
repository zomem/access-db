
const word1 = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j'
]

const word2 = [
  'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't'
]


// 以hrTime为随机的hash
export default function timeHash(){

  let hrTime = process.hrtime()
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
  
  return hash
}


export const strHash = () => {
  let hrt = process.hrtime()
  let nowTime = new Date().getTime()
  let ran = (Math.random() * 10000 + 2) >>> 0
  let ran2 = (Math.random() * 1000 + 1) >>> 0
  let sl = (Math.random() * 10 + 5) >>> 0
  let a = (ran.toString(36) + hrt[0].toString(36) + hrt[1].toString(36) + nowTime.toString(36) + ran2.toString(36))
  let s = (a + a.slice(-sl)).substr(0, 25)
  return s
}