
const word = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j'
]

// 以hrTime为随机的hash
export default function timeHash(){
  let [sec, nano] = process.hrtime()
  let hash = ''
  let str = `${nano}${sec}`
  for(let i = 0; i < str.length; i++){
    hash += word[str[i]] || 'x'
  }
  return hash
}

// fastdb 新增时的随机id
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