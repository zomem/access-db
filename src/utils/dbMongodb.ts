import _mongodb, {MongoClient, ObjectId} from 'mongodb'


/**
 * 
 *  MONGODB_HOST=
 *  MONGODB_USER=
 *  MONGODB_PASSWORD=
 *  MONGODB_DATABASE=
 *  MONGODB_PORT=
 *  
 */


// mongodb 连接
let dbUri = 'mongodb://' 
      + process.env.MONGODB_HOST + ':' 
      + (process.env.MONGODB_PORT || '27017')
if(process.env.MONGODB_USER){
  dbUri = 'mongodb://' 
    + process.env.MONGODB_USER + ':' 
    + process.env.MONGODB_PASSWORD + '@' 
    + process.env.MONGODB_HOST + ':' 
    + (process.env.MONGODB_PORT || '27017')
}

let client = new MongoClient(dbUri)

export const mongodbCollection = {
  client: process.env.MONGODB_HOST ? client : null,
  db: process.env.MONGODB_HOST ? client.db(process.env.MONGODB_DATABASE) : null
}



export const mongodbId = (id: any) => {
  let tempId
  if(typeof(id) === 'string'){
    let hex = /^[a-fA-F0-9]{24}$/
    tempId = (hex.test(id)) ? (new ObjectId(id)) : id
  }else{
    tempId = id
  }
  return tempId
}

export const mongodb = process.env.MONGODB_HOST ? _mongodb : null

