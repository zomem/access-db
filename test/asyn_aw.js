let asy2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('asy2 异步调用')
      resolve(true)
    }, 500);
  })
} 


let asy = () => {
  return new Promise(async (resolve, reject) => {
    console.log('asy 异步调用k')
    await asy2()
    console.log('asy 异步调用l')
    if(3) {
      return reject('33333')
    }
    setTimeout(() => {
      console.log('asy 异步调用完')
      resolve(true)
    }, 500);
  })
}




let a = (c) => {
  c()
}


a(async () => {
  try{
    console.log('fb 异步调用1')
    await asy()
    console.log('fb 异步调用3')
  }catch(err){
    console.log('a>>>err: ', err)
  }
})