### 统一各类数据库的连接    

   
目前支持的数据库有：  
  
| 数据库  | 说明                                          | 支持版本 |
| ------- | --------------------------------------------- | :------- |
| FastDB  | 本地json文件数据库<br />\[由access_db团队开发\]  | 0.5.0    |
| MongoDB | 分布式文件存储数据库                            | 4.x      |
| Mysql   | 关系型数据库                                  | 8.x, 5.x |
| Redis   | 高性能的 key-value 数据库                     | 6.x, 5.x |
| Elaticsearch   | 搜索引擎                              | 8.x      |
| Mssql   | microsoft sql server                       |   2017+  |
  
  
#### 使用示例：  
```js 
import {
  mysql, mongodb, redis, fastdb, 
  elasticsearch, mssql
} from 'access-db'

async function exp() {
  fastdb.set('city', {id: 1, name: 'one'})

  await mongodb.get('tableName1', id)

  await mysql.find('tableName2', {
    p0: ['num', '=', 32],
    r: 'p0'
  })

  await redis.set('tableName2', {
    id: 2,
    num: 12
  }, 3000)
}
```
  
#### 安装  
> npm install access-db   

#### 在项目根目录新建`.env`文件，然后填写配置信息  
        
```python
MYSQL_HOST=localhost   // 非必填，不填则表示不使用该数据库
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_PORT=3306
MYSQL_DATABASE=
# 默认UTF8_GENERAL_CI
# MYSQL_CHARSET=
# 最大连接数，默认10
# MYSQL_CONNECTION_LIMIT=


MSSQL_HOST=localhost
MSSQL_PORT=1433
MSSQL_USER=SA
MSSQL_PASSWORD=83jaidfka3jladjf
MSSQL_DATABASE=access_db
MSSQL_AZURE=1  # 是否是用的 microsoft azure
MSSQL_DEV=1   # 是否是 本地开发 


MONGODB_HOST=localhost    # 非必填，不填则表示不使用该数据库
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_DATABASE=
MONGODB_PORT=27017

REDIS_HOST=localhost   # 非必填，不填则表示不使用该数据库
REDIS_USER=
REDIS_PASSWORD=
REDIS_DATABASE=
REDIS_PORT=6379


FASTDB_DIR=fastdb   # fastdb的数据存储目录，默认项目根目录下的fastdb目录
FASTDB_PATH=../../../../   #存储位置，默认不填。。如果你要将fastdb方法打包出来，就要配置


ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_USER=elastic
ELASTICSEARCH_PASSWORD=F1V8YE3QyOKUHcQswsbc
ELASTICSEARCH_CA_PATH=/Users/zj/elasticsearch-8.0.1/config/certs/http_ca.crt
ELASTICSEARCH_DATABASE=access_db

```

> node ./server.js    # 一定要在项目根目录启动，不然 .env 文件不生效

**关于fastdb说明**

1. 数据库为json文件
2. 每条数据以对象的形式保存，然后一起组成数组
3. json里没有**换行**和**空格**符号，当前字段的值是可以包含这些的。
4. **每条数据最前面**都有唯一标识`"id":"xxx"`（新增(fastdb.set)数据时，会自动生成或调整）  
  

  
