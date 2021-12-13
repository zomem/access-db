import { hrtime } from 'process'
const word = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j'
]

// 以hrTime为随机的hash   hrtime.bigint();
export default function timeHash(){
  let hrt = hrtime.bigint()
  let hash = ''
  let str = `${hrt}`
  for(let i = 0; i < str.length; i++){
    hash += word[str[i]] || 'x'
  }
  return hash
}

// fastdb 新增时的随机id
export const strHash = () => {
  let hrt = hrtime.bigint()
  let nowTime = new Date().getTime()
  let s = `${nowTime}${hrt}`
  return s
}