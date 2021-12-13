import {GEO_POLYGON_ERROR} from '../constants/error'


export const isMongodbObjectId = (value: any) => {
  return value._bsontype === 'ObjectID'
}
export const isJson = (value: any) => {
  return typeof(value) === 'object'
}
//isArray属于isJson
export const isArray = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Array]'
}
export const isNumber = (value: any) => {
  return typeof(value) === 'number' && !isNaN(value)
}

// 检查polygon是否对
const isPolygonArr = (arr: [number, number][]) => {
  if((arr.length < 4) || (arr[0][0] !== arr[arr.length-1][0]) || (arr[0][1] !== arr[arr.length-1][1])){
    throw new Error(GEO_POLYGON_ERROR)
  }else{
    return true
  }
}
// 目前仅支持对象或数字的拷贝
export const cloneDeep = (source: any) => {
  if (source === undefined || source === null) return Object.create(null)
  const target = isArray(source) ? [] : Object.create(Object.getPrototypeOf(source))
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        target[keys] = isArray(source[keys]) ? [] : {}
        target[keys] = cloneDeep(source[keys])
      } else {
        target[keys] = source[keys]
      }
    }
  }
  return target
}

// 返回新增的对象，geopoint化
export const changeSetParams = (params: any) => {
  let changeData = params
  for(let p in params){
    if(isArray(params[p])){
      if(params[p][0] === 'geo'){
        if(isArray(params[p][1])){
          let temp = params[p]
          temp.shift()
          if(temp.length > 1){
            isPolygonArr(temp)
            changeData[p] = cloneDeep({
              type: 'Polygon',
              coordinates: [temp]
            })
          }else{
            changeData[p] = cloneDeep({
              type: 'Point',
              coordinates: temp[0]
            })
          }
        }
      }
    }
  }
  return changeData
}

export const changeSetManyParams = (params: any) => {
  let change = []
  for(let i = 0; i < params.length; i++){
    change.push(changeSetParams(params[i]))
  }
  return change
}


// 返回geojson
export const changeFindGeoJson = (lparams: any) => {  //['point', 'include', [23, 32]]
  let temp = []  
  if(lparams[1] === 'within'){
    lparams.splice(0,2)
    isPolygonArr(lparams)
    temp = cloneDeep({
      type: 'Polygon',
      coordinates: [lparams]
    })
  }else{
    temp = cloneDeep({
      type: 'Point',
      coordinates: lparams[2]
    })
  }
  return temp
}


// 返回mysql语句的参数类型
export const changeSqlParam = (param: any) => {
  let result: any = `'${param}'`
  if(param){
    // param 存在
    if(isNumber(param)){
      return result = param
    }
    if(typeof(param) === 'boolean'){
      return result = 'TRUE'
    }
  }else{
    // param 为否  可能为   null '' 0 false
    if(typeof(param) === 'undefined'){
      return result = `''`
    }
    if(typeof(param) === 'string'){
      return result = `''`
    }
    if(typeof(param) === 'number' && !isNaN(param)){
      return result = 0
    }
    if(typeof(param) === 'boolean'){
      return result = 'FALSE'
    }
    if(typeof(param) === 'object'){
      return result = 'NULL'
    }
  }
  return result
}


// 快速排序，推荐，用于redis默认排序,默认的存入的时间先后
export const stringTimeNumSort = (arr, list) => {
  function main(arr, left, right, list) {
    if(arr.length === 1) {
      return
    }
    let index = partition(arr, left, right, list)
    if(left < index - 1) {
      main(arr, left, index - 1, list)
    }
    if(index < right) {
      main(arr, index, right, list)
    }
  }
  function partition(arr, left, right, list) {
    let pivot = arr[Math.floor((left + right) / 2)]
    while(left <= right) {
      while(arr[left] > pivot) {
        left++
      }
      while(arr[right] < pivot) {
        right--
      }
      if(left <= right) {
        let temp = arr[right]
        arr[right] = arr[left]
        arr[left] = temp
        temp = list[right]
        list[right] = list[left]
        list[left] = temp
        left++
        right--
      }
    }
    return left
  }

  let left = 0, right = arr.length - 1
  main(arr, left, right, list)
  return list
  
}


// 按数组对象的值,数字，降序排列，用于redis
export const RedisSortNum = (arr, key, isUp=1) => {
  if(isUp === 1){
    function main(arr, left, right) {
      if(arr.length === 1) {
        return
      }
      let index = partition(arr, left, right)
      if(left < index - 1) {
        main(arr, left, index - 1)
      }
      if(index < right) {
        main(arr, index, right)
      }
    }
    function partition(arr, left, right) {
      let pivot = +(arr[Math.floor((left + right) / 2)][key] || 0)
      while(left <= right) {
        while(+(arr[left][key] || 0) < pivot) {
          left++
        }
        while(+(arr[right][key] || 0) > pivot) {
          right--
        }
        if(left <= right) {
          let temp = arr[right]
          arr[right] = arr[left]
          arr[left] = temp
          left++
          right--
        }
      }
      return left
    }
  
    let left = 0, right = arr.length - 1
    main(arr, left, right)
    return arr

  }else{
    function main(arr, left, right) {
      if(arr.length === 1) {
        return
      }
      let index = partition(arr, left, right)
      if(left < index - 1) {
        main(arr, left, index - 1)
      }
      if(index < right) {
        main(arr, index, right)
      }
    }
    function partition(arr, left, right) {
      let pivot = +(arr[Math.floor((left + right) / 2)][key] || 0)
      while(left <= right) {
        while(+(arr[left][key] || 0) > pivot) {
          left++
        }
        while(+(arr[right][key] || 0) < pivot) {
          right--
        }
        if(left <= right) {
          let temp = arr[right]
          arr[right] = arr[left]
          arr[left] = temp
          left++
          right--
        }
      }
      return left
    }
  
    let left = 0, right = arr.length - 1
    main(arr, left, right)
    return arr

  }
}

// 按数组对象的值，降序排列，用于redis
export const RedisSortStr = (arr, key, isUp=1) => {
  if(isUp === 1){
    function main(arr, left, right) {
      if(arr.length === 1) {
        return
      }
      let index = partition(arr, left, right)
      if(left < index - 1) {
        main(arr, left, index - 1)
      }
      if(index < right) {
        main(arr, index, right)
      }
    }
    function partition(arr, left, right) {
      let pivot = arr[Math.floor((left + right) / 2)][key]
      while(left <= right) {
        while(arr[left][key] < pivot) {
          left++
        }
        while(arr[right][key] > pivot) {
          right--
        }
        if(left <= right) {
          let temp = arr[right]
          arr[right] = arr[left]
          arr[left] = temp
          left++
          right--
        }
      }
      return left
    }
  
    let left = 0, right = arr.length - 1
    main(arr, left, right)
    return arr

  }else{
    function main(arr, left, right) {
      if(arr.length === 1) {
        return
      }
      let index = partition(arr, left, right)
      if(left < index - 1) {
        main(arr, left, index - 1)
      }
      if(index < right) {
        main(arr, index, right)
      }
    }
    function partition(arr, left, right) {
      let pivot = arr[Math.floor((left + right) / 2)][key]
      while(left <= right) {
        while(arr[left][key] > pivot) {
          left++
        }
        while(arr[right][key] < pivot) {
          right--
        }
        if(left <= right) {
          let temp = arr[right]
          arr[right] = arr[left]
          arr[left] = temp
          left++
          right--
        }
      }
      return left
    }
  
    let left = 0, right = arr.length - 1
    main(arr, left, right)
    return arr

  }
}


// 排序 find，fastdb
export const fastdbSort = (arr, key, isUp=1) => {
  if(isUp === 1){
    function main(arr, left, right) {
      if(arr.length === 1) {
        return
      }
      let index = partition(arr, left, right)
      if(left < index - 1) {
        main(arr, left, index - 1)
      }
      if(index < right) {
        main(arr, index, right)
      }
    }
    function partition(arr, left, right) {
      let pivot = arr[Math.floor((left + right) / 2)][key]
      while(left <= right) {
        while(arr[left][key] < pivot) {
          left++
        }
        while(arr[right][key] > pivot) {
          right--
        }
        if(left <= right) {
          let temp = arr[right]
          arr[right] = arr[left]
          arr[left] = temp
          left++
          right--
        }
      }
      return left
    }
  
    let left = 0, right = arr.length - 1
    main(arr, left, right)
  }else{
    function main(arr, left, right) {
      if(arr.length === 1) {
        return
      }
      let index = partition(arr, left, right)
      if(left < index - 1) {
        main(arr, left, index - 1)
      }
      if(index < right) {
        main(arr, index, right)
      }
    }
    function partition(arr, left, right) {
      let pivot = arr[Math.floor((left + right) / 2)][key]
      while(left <= right) {
        while(arr[left][key] > pivot) {
          left++
        }
        while(arr[right][key] < pivot) {
          right--
        }
        if(left <= right) {
          let temp = arr[right]
          arr[right] = arr[left]
          arr[left] = temp
          left++
          right--
        }
      }
      return left
    }
  
    let left = 0, right = arr.length - 1
    main(arr, left, right)
  }
  return arr
}