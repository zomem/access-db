
const fs = require('fs')
const path = require('path')

export const pathTo = (fileName: string): string => {
  const dir = process.env.FASTDB_DIR
  if(dir){
    return path.join(__dirname, `../../../../${dir}/` + fileName + '.json')
    // return path.join(__dirname, `../../${dir}/fastdb/` + fileName + '.json')
  }else{
    return path.join(__dirname, `../../../../fastdb/` + fileName + '.json')
    // return path.join(__dirname, '../../fastdb/' + fileName + '.json')
  }
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