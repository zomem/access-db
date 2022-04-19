
const fs = require('fs')
const path = require('path')

export const pathTo = (fileName: string): string => {
  let dir = process.env.FASTDB_DIR || 'fastdb'
  let fpath = process.env.FASTDB_PATH || `../../../../`
  return path.join(__dirname, fpath + `${dir}/` + fileName + '.json')
}


export const mkdir = (filePath, data) => {
  let dirCache={}, arr
  if(/\\/.test(filePath)){
    //windows
    arr = filePath.split('\\')
  }else{
    //linux
    arr = filePath.split('/')
  }
  arr.shift()
  let dir = '/' + arr[0]
  for(let i = 1; i < arr.length; i++){
    if(!dirCache[dir] && !fs.existsSync(dir)){
      dirCache[dir]=true
      fs.mkdirSync(dir)
    }
    dir = dir + '/' + arr[i]
  }
  fs.writeFileSync(filePath, data)
}