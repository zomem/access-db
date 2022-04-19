import {Client} from '@elastic/elasticsearch'
const fs = require('fs')

let ca
if(process.env.ELASTICSEARCH_CA_PATH){
  ca = fs.readFileSync(process.env.ELASTICSEARCH_CA_PATH)
}
const database = process.env.ELASTICSEARCH_DATABASE || ''


export const client = process.env.ELASTICSEARCH_HOST ? new Client({
  node: `https://${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT || 9200}`,
  auth: {
    username: process.env.ELASTICSEARCH_USER,
    password: process.env.ELASTICSEARCH_PASSWORD
  },
  tls: {
    ca: ca,
    rejectUnauthorized: false
  }
}) : null

export const esTable = (table) => {
  return database ? database + '_' + table : table
}


