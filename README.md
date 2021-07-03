#### 简单中文  
  
[access-db文档](https://access-db.cn)  
  
##### 统一各类数据库的访问    
    
目前支持的数据库有：  
1). **FastDB本地json数据库**   
2). **MongoDB数据库**   
3). **Mysql数据库**  
4). **Redis数据库**  
  
1. 安装  
> npm install access-db  
> yarn add access-db  
  
2. 在项目根目录新建`.env`文件，然后填写配置信息  
> yarn add dotenv  
然后在项目最开始尽可能早的引入`require('dotenv').config()`  
`.env`配置如下  
```c
  MYSQL_HOST=localhost   // 必填
  MYSQL_USER=root
  MYSQL_PASSWORD=123456
  MYSQL_PORT=3306
  MYSQL_DATABASE=
  # 默认UTF8_GENERAL_CI
  # MYSQL_CHARSET=
  # 最大连接数，默认10
  # MYSQL_CONNECTION_LIMIT=


  MONGODB_HOST=localhost    // 必填
  MONGODB_USER=
  MONGODB_PASSWORD=
  MONGODB_DATABASE=
  MONGODB_PORT=

  REDIS_HOST=localhost    // 必填
  REDIS_PORT=

  FASTDB_DIR=   // fastdb的数据存储目录，默认fastdb目录。

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
  
##### 其他   

  
> -----  
   
#### English  
  
[access-db doc](https://access-db.cn)  
  
##### Unified access to all kinds of databases    
    
At present, the supported databases are as follows:   
1). **FastDB local json database**   
2). **MongoDB database**   
3). **Mysql database**  
4). **Redis database**  
  
1. install  
> npm install access-db   
> yarn add access-db   
  
2. Create a new `.env` file in the project root directory, and then fill in the configuration information   
> yarn add dotenv  
Then introduce `require('dotenv').config()` as early as possible at the beginning of the project   
`.env` is configured as follows  

```c  
  MYSQL_HOST=localhost   // 必填
  MYSQL_USER=root
  MYSQL_PASSWORD=123456
  MYSQL_PORT=3306
  MYSQL_DATABASE=
  # Default: UTF8_GENERAL_CI
  # MYSQL_CHARSET=
  # The maximum number of connections to create at once. (Default: 10)  
  # MYSQL_CONNECTION_LIMIT= 

  MONGODB_HOST=localhost    // 必填
  MONGODB_USER=
  MONGODB_PASSWORD=
  MONGODB_DATABASE=
  MONGODB_PORT=
  
  REDIS_HOST=localhost    // 必填
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
  
##### other   







