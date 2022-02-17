### 统一各类数据库的连接    
[access-db文档](https://access-db.cn)  
[更新日志](https://access-db.cn/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97)  
#### 使用示例：  
```js 
import {mysql, mongodb, redis, fastdb} from 'access-db'

async function exp() {
  fastdb.set('city', {id: 1, name: 'one'})
  await mysql.find('tableName2', {
    p0: ['num', '=', (await mongodb.get('tableName1', id)).data.num],
    r: 'p0'
  })
  await redis.set('tableName2', {
    id: 2,
    num: 12
  }, 3000)
}
```
  
#### 安装  
> npm install access-db dotenv   

#### 在项目根目录新建`.env`文件，然后填写配置信息   
然后在项目最开始(app.js)，尽可能早的引入`require('dotenv').config()`，详情可以查看dotenv的使用  
`.env`配置如下  
  
> MYSQL_HOST  MONGODB_HOST  REDIS_HOST  FASTDB_DIR
> 你使用什么数据库，则对应的地址就必填，不使用则不填
        
```c
  MYSQL_HOST=localhost   // 非必填，不填则表示不使用该数据库
  MYSQL_USER=root
  MYSQL_PASSWORD=123456
  MYSQL_PORT=3306
  MYSQL_DATABASE=
  # 默认UTF8_GENERAL_CI
  # MYSQL_CHARSET=
  # 最大连接数，默认10
  # MYSQL_CONNECTION_LIMIT=


  MONGODB_HOST=localhost    // 非必填，不填则表示不使用该数据库
  MONGODB_USER=
  MONGODB_PASSWORD=
  MONGODB_DATABASE=
  MONGODB_PORT=

  REDIS_HOST=localhost    // 非必填，不填则表示不使用该数据库
  REDIS_USER=
  REDIS_PASSWORD=
  REDIS_DATABASE=
  REDIS_PORT=


  FASTDB_DIR=   // fastdb的数据存储目录，默认项目根目录下的fastdb目录


```


**关于fastdb说明**

1. 数据库为json文件
2. 每条数据以对象的形式保存，然后一起组成数组
3. json里没有**换行**和**空格**符号，当前字段的值是可以包含这些的。
4. **每条数据最前面**都有唯一标识`"id":"xxx"`（新增(fastdb.set)数据时，会自动生成或调整）  
  
  
   
目前支持的数据库有：  

| 数据库  | 说明                                          | 支持版本 |
| ------- | --------------------------------------------- | :------- |
| FastDB  | 本地json文件数据库<br />\[由access_db团队开发\]  | 0.1.0    |
| MongoDB | 分布式文件存储数据库                          | 4.x      |
| Mysql   | 关系型数据库                                  | 8.x, 5.x |
| Redis   | 高性能的 key-value 数据库                     | 6.x, 5.x |
  
  
#### 成功案例  
<img src="https://file.zomem.com/zhihehe/images/wzj.jpeg" style="height:20%;width:20%" />  

  
### Unified access to all kinds of databases     
[access-db document](https://access-db.cn)   
[ChangeLog](https://access-db.cn/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97)  
#### use:   
```js 
import {mysql, mongodb, redis, fastdb} from 'access-db'

async function exp() {
  fastdb.set('city', {id: 1, name: 'one'})
  await mysql.find('tableName2', {
    p0: ['num', '=', (await mongodb.get('tableName1', id)).data.num],
    r: 'p0'
  })
  await redis.set('tableName2', {
    id: 2,
    num: 12
  }, 3000)
}
```

#### install  
> npm install access-db dotenv    
   
#### Create a new `.env` file in the project root directory, and then fill in the configuration information  
Then introduce `require('dotenv').config()` as early as possible at the beginning of the project(app.js)   
`.env` is configured as follows  
  
> MYSQL_HOST  MONGODB_HOST  REDIS_HOST  FASTDB_DIR
> If you use any database, the corresponding address is required, and if you do not use it, it will be empty.
    
```c  
  MYSQL_HOST=localhost   // not need，if it's undefined, the db will not be used
  MYSQL_USER=root
  MYSQL_PASSWORD=123456
  MYSQL_PORT=3306
  MYSQL_DATABASE=
  # Default: UTF8_GENERAL_CI
  # MYSQL_CHARSET=
  # The maximum number of connections to create at once. (Default: 10)
  # MYSQL_CONNECTION_LIMIT= 

  MONGODB_HOST=localhost    // not need，if it's undefined, the db will not be used
  MONGODB_USER=
  MONGODB_PASSWORD=
  MONGODB_DATABASE=
  MONGODB_PORT=
  
  REDIS_HOST=localhost    // not need，if it's undefined, the db will not be used
  REDIS_USER=
  REDIS_PASSWORD=
  REDIS_DATABASE=
  REDIS_PORT=

  FASTDB_DIR=   // the dir of fastdb. default is project's root
```

  
At present, the supported databases are as follows:    
 
| database | introduction                                                 | supported version |
| -------- | ------------------------------------------------------------ | :---------------- |
| FastDB   | Local JSON file database<br /> \[by access_ DB team development\] | 0.1.0        |
| MongoDB  | Distributed file storage database                            | 4.x               |
| Mysql    | Relational database                                          | 8.x, 5.x          |
| Redis    | High performance key value database                          | 6.x, 5.x          |

  




