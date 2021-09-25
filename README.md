#### 简单中文  
  
[access-db文档](https://access-db.cn)  
## 统一各类数据库的连接    

目前支持的数据库有：  

| 数据库  | 说明                                          | 支持版本 |
| ------- | --------------------------------------------- | :------- |
| FastDB  | 本地json文件数据库<br />[由access_db团队开发]  | 0.0.4    |
| MongoDB | 分布式文件存储数据库                          | 4.x      |
| Mysql   | 关系型数据库                                  | 8.0, 5.x |
| redis   | 高性能的 key-value 数据库                     | 6.x, 5.x |



1. 安装  
> npm install access-db  
> yarn add access-db  

2. 在项目根目录新建`.env`文件，然后填写配置信息  
> yarn add dotenv  
然后在项目最开始尽可能早的引入`require('dotenv').config()`  
`.env`配置如下  
```c
  MYSQL_HOST=localhost   // 必填，不填则表示不使用该数据库
  MYSQL_USER=root
  MYSQL_PASSWORD=123456
  MYSQL_PORT=3306
  MYSQL_DATABASE=    // 必填  数据库名
  # 默认UTF8_GENERAL_CI
  # MYSQL_CHARSET=
  # 最大连接数，默认10
  # MYSQL_CONNECTION_LIMIT=


  MONGODB_HOST=localhost    // 必填，不填则表示不使用该数据库
  MONGODB_USER=
  MONGODB_PASSWORD=
  MONGODB_DATABASE=        // 必填  数据库名
  MONGODB_PORT=

  REDIS_HOST=localhost    // 必填，不填则表示不使用该数据库
  REDIS_PORT=


  FASTDB_DIR=   // fastdb的数据存储目录，默认项目根目录下的fastdb目录


```


3. 使用：  
```js 
import {mysql, mongodb} from 'access-db'

async function exp() {
  let {data} = await mongodb.get('tableName1', id)
  await mysql.find('tableName2', {
    p0: ['num', '=', data.num],
    r: 'p0'
  })
}
```


#### English

[access-db doc](https://access-db.cn)  
## Unified access to all kinds of databases    

At present, the supported databases are as follows:   

| database | introduction                                                 | supported version |
| -------- | ------------------------------------------------------------ | :---------------- |
| FastDB   | Local JSON file database<br /> [by access_ DB team development] | 0.0.4             |
| MongoDB  | Distributed file storage database                            | 4.x               |
| Mysql    | Relational database                                          | 8.0, 5.x          |
| redis    | High performance key value database                          | 6.x, 5.x          |



1. install  
> npm install access-db   
> yarn add access-db   

2. Create a new `.env` file in the project root directory, and then fill in the configuration information   
> yarn add dotenv  
Then introduce `require('dotenv').config()` as early as possible at the beginning of the project   
`.env` is configured as follows  

```c  
  MYSQL_HOST=localhost   // need，if it's undefined, the db will not be used
  MYSQL_USER=root
  MYSQL_PASSWORD=123456
  MYSQL_PORT=3306
  MYSQL_DATABASE=        // need
  # Default: UTF8_GENERAL_CI
  # MYSQL_CHARSET=
  # The maximum number of connections to create at once. (Default: 10)  
  # MYSQL_CONNECTION_LIMIT= 

  MONGODB_HOST=localhost    // need，if it's undefined, the db will not be used
  MONGODB_USER=
  MONGODB_PASSWORD=
  MONGODB_DATABASE=           // need
  MONGODB_PORT=
  
  REDIS_HOST=localhost    // need，if it's undefined, the db will not be used
  REDIS_PORT=

  FASTDB_DIR=   // the dir of fastdb. default is project's root
```


3. use:   
```js 
import {mysql, mongodb} from 'access-db'

async function exp() {
  let {data} = await mongodb.get('tableName1', id)
  await mysql.find('tableName2', {
    p0: ['num', '=', data.num],
    r: 'p0'
  })
}
```





