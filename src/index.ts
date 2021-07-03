
import mongodb_temp from './mongodb/index'
import mysql_temp from './mysql/index'
import redis_temp from './redis/index'
import fastdb_temp from './fastdb'
import promiseLimit_temp from './common/promiseLimit'


export default {
  mongodb: mongodb_temp,
  mysql: mysql_temp,
  redis: redis_temp,
  fastdb: fastdb_temp,
  promiseLimit: promiseLimit_temp
}


export const mongodb = mongodb_temp
export const mysql = mysql_temp
export const redis = redis_temp
export const fastdb = fastdb_temp
export const promiseLimit = promiseLimit_temp



















export type TPlatform = 'mongodb' | 'mysql'


//查寻的表名或表id
export type TTable = string



//查寻的方法
export type TMongodbCheckMethod = '=' | '!=' | '<' | '<=' | '>' | '>=' |
'in' | 'notIn' | 'arrContain' | 'regex' | 'strLength' | 'isExists' | 
'geoInclude' | 'geoWithinCircle' | 'geoWithinRegion' | 'geoWithin'
export type TMysqlCheckMethod = '=' | '!=' | '<' | '<=' | '>' | '>=' |
'in' | 'notIn' | 'regex' | 'strLength' | 
'like' | 'between' | 'notBetween' |
'isNull' | 'isExists'
export type TFastdbCheckMethod = '=' | '!=' | '<' | '<=' | '>' | '>=' |
'in' | 'notIn' | 'arrContain' | 'regex' | 'strLength' | 'isExists'

//j方法，mysql的join 聚合等
export type TMysqlJiaMethod = 'uniqueTable' | 'tableOf' | 'inner' | 'left' | 'right' | 'full' | 'count' | 
'sum' | 'max' | 'min' | 'avg' | 'ucase' | 'lcase' |
'mid' | 'len' | 'round' | 'now' | 'format'

export type TMysqlJiaParams = 'distinct' | 'all'
//j参数
export type TJ = 'j0' | 'j1' | 'j2' | 'j3' | 'j4' | 'j5' | 'j6' | 'j7' | 'j8' | 'j9'

//查寻的参数
export type TP = 'p0' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8'
| 'p9' | 'p10' | 'p11' | 'p12' | 'p13' | 'p14' | 'p15' | 'p16' | 'p17' | 'p18' | 'p19'



interface IMysqlPRList {
  j0?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j1?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j2?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j3?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j4?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j5?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j6?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j7?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j8?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  j9?: [string, TMysqlJiaMethod, 'distinct'] | [string, TMysqlJiaMethod, string] | [string, TMysqlJiaMethod]
  p0?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p1?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p2?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p3?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p4?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p5?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p6?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p7?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p8?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p9?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p10?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p11?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p12?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p13?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p14?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p15?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p16?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p17?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p18?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p19?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p20?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p21?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p22?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p23?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p24?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p25?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p26?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p27?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p28?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p29?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p30?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p31?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p32?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p33?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p34?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p35?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p36?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p37?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p38?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p39?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p40?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p41?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p42?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p43?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p44?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p45?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p46?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p47?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p48?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p49?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p50?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p51?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p52?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p53?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p54?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p55?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p56?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p57?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p58?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p59?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p60?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p61?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p62?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p63?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p64?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p65?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p66?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p67?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p68?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p69?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p70?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p71?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p72?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p73?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p74?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p75?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p76?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p77?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p78?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p79?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p80?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p81?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p82?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p83?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p84?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p85?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p86?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p87?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p88?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p89?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p90?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p91?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p92?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p93?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p94?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p95?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p96?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p97?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p98?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  p99?: [string, TMysqlCheckMethod, ...any[]] | [TJ, TMysqlCheckMethod, ...any[]]
  r?: string
  r2?: string
}


interface IMongodbPRList {
  p0?: [string, TMongodbCheckMethod, ...any[]]
  p1?: [string, TMongodbCheckMethod, ...any[]]
  p2?: [string, TMongodbCheckMethod, ...any[]]
  p3?: [string, TMongodbCheckMethod, ...any[]]
  p4?: [string, TMongodbCheckMethod, ...any[]]
  p5?: [string, TMongodbCheckMethod, ...any[]]
  p6?: [string, TMongodbCheckMethod, ...any[]]
  p7?: [string, TMongodbCheckMethod, ...any[]]
  p8?: [string, TMongodbCheckMethod, ...any[]]
  p9?: [string, TMongodbCheckMethod, ...any[]]
  p10?: [string, TMongodbCheckMethod, ...any[]]
  p11?: [string, TMongodbCheckMethod, ...any[]]
  p12?: [string, TMongodbCheckMethod, ...any[]]
  p13?: [string, TMongodbCheckMethod, ...any[]]
  p14?: [string, TMongodbCheckMethod, ...any[]]
  p15?: [string, TMongodbCheckMethod, ...any[]]
  p16?: [string, TMongodbCheckMethod, ...any[]]
  p17?: [string, TMongodbCheckMethod, ...any[]]
  p18?: [string, TMongodbCheckMethod, ...any[]]
  p19?: [string, TMongodbCheckMethod, ...any[]]
  p20?: [string, TMongodbCheckMethod, ...any[]]
  p21?: [string, TMongodbCheckMethod, ...any[]]
  p22?: [string, TMongodbCheckMethod, ...any[]]
  p23?: [string, TMongodbCheckMethod, ...any[]]
  p24?: [string, TMongodbCheckMethod, ...any[]]
  p25?: [string, TMongodbCheckMethod, ...any[]]
  p26?: [string, TMongodbCheckMethod, ...any[]]
  p27?: [string, TMongodbCheckMethod, ...any[]]
  p28?: [string, TMongodbCheckMethod, ...any[]]
  p29?: [string, TMongodbCheckMethod, ...any[]]
  p30?: [string, TMongodbCheckMethod, ...any[]]
  p31?: [string, TMongodbCheckMethod, ...any[]]
  p32?: [string, TMongodbCheckMethod, ...any[]]
  p33?: [string, TMongodbCheckMethod, ...any[]]
  p34?: [string, TMongodbCheckMethod, ...any[]]
  p35?: [string, TMongodbCheckMethod, ...any[]]
  p36?: [string, TMongodbCheckMethod, ...any[]]
  p37?: [string, TMongodbCheckMethod, ...any[]]
  p38?: [string, TMongodbCheckMethod, ...any[]]
  p39?: [string, TMongodbCheckMethod, ...any[]]
  p40?: [string, TMongodbCheckMethod, ...any[]]
  p41?: [string, TMongodbCheckMethod, ...any[]]
  p42?: [string, TMongodbCheckMethod, ...any[]]
  p43?: [string, TMongodbCheckMethod, ...any[]]
  p44?: [string, TMongodbCheckMethod, ...any[]]
  p45?: [string, TMongodbCheckMethod, ...any[]]
  p46?: [string, TMongodbCheckMethod, ...any[]]
  p47?: [string, TMongodbCheckMethod, ...any[]]
  p48?: [string, TMongodbCheckMethod, ...any[]]
  p49?: [string, TMongodbCheckMethod, ...any[]]
  p50?: [string, TMongodbCheckMethod, ...any[]]
  p51?: [string, TMongodbCheckMethod, ...any[]]
  p52?: [string, TMongodbCheckMethod, ...any[]]
  p53?: [string, TMongodbCheckMethod, ...any[]]
  p54?: [string, TMongodbCheckMethod, ...any[]]
  p55?: [string, TMongodbCheckMethod, ...any[]]
  p56?: [string, TMongodbCheckMethod, ...any[]]
  p57?: [string, TMongodbCheckMethod, ...any[]]
  p58?: [string, TMongodbCheckMethod, ...any[]]
  p59?: [string, TMongodbCheckMethod, ...any[]]
  p60?: [string, TMongodbCheckMethod, ...any[]]
  p61?: [string, TMongodbCheckMethod, ...any[]]
  p62?: [string, TMongodbCheckMethod, ...any[]]
  p63?: [string, TMongodbCheckMethod, ...any[]]
  p64?: [string, TMongodbCheckMethod, ...any[]]
  p65?: [string, TMongodbCheckMethod, ...any[]]
  p66?: [string, TMongodbCheckMethod, ...any[]]
  p67?: [string, TMongodbCheckMethod, ...any[]]
  p68?: [string, TMongodbCheckMethod, ...any[]]
  p69?: [string, TMongodbCheckMethod, ...any[]]
  p70?: [string, TMongodbCheckMethod, ...any[]]
  p71?: [string, TMongodbCheckMethod, ...any[]]
  p72?: [string, TMongodbCheckMethod, ...any[]]
  p73?: [string, TMongodbCheckMethod, ...any[]]
  p74?: [string, TMongodbCheckMethod, ...any[]]
  p75?: [string, TMongodbCheckMethod, ...any[]]
  p76?: [string, TMongodbCheckMethod, ...any[]]
  p77?: [string, TMongodbCheckMethod, ...any[]]
  p78?: [string, TMongodbCheckMethod, ...any[]]
  p79?: [string, TMongodbCheckMethod, ...any[]]
  p80?: [string, TMongodbCheckMethod, ...any[]]
  p81?: [string, TMongodbCheckMethod, ...any[]]
  p82?: [string, TMongodbCheckMethod, ...any[]]
  p83?: [string, TMongodbCheckMethod, ...any[]]
  p84?: [string, TMongodbCheckMethod, ...any[]]
  p85?: [string, TMongodbCheckMethod, ...any[]]
  p86?: [string, TMongodbCheckMethod, ...any[]]
  p87?: [string, TMongodbCheckMethod, ...any[]]
  p88?: [string, TMongodbCheckMethod, ...any[]]
  p89?: [string, TMongodbCheckMethod, ...any[]]
  p90?: [string, TMongodbCheckMethod, ...any[]]
  p91?: [string, TMongodbCheckMethod, ...any[]]
  p92?: [string, TMongodbCheckMethod, ...any[]]
  p93?: [string, TMongodbCheckMethod, ...any[]]
  p94?: [string, TMongodbCheckMethod, ...any[]]
  p95?: [string, TMongodbCheckMethod, ...any[]]
  p96?: [string, TMongodbCheckMethod, ...any[]]
  p97?: [string, TMongodbCheckMethod, ...any[]]
  p98?: [string, TMongodbCheckMethod, ...any[]]
  p99?: [string, TMongodbCheckMethod, ...any[]]
  r?: string
  r2?: string
}

interface IFastdbPRList {
  p0?: [string, TFastdbCheckMethod, ...any[]]
  p1?: [string, TFastdbCheckMethod, ...any[]]
  p2?: [string, TFastdbCheckMethod, ...any[]]
  p3?: [string, TFastdbCheckMethod, ...any[]]
  p4?: [string, TFastdbCheckMethod, ...any[]]
  p5?: [string, TFastdbCheckMethod, ...any[]]
  p6?: [string, TFastdbCheckMethod, ...any[]]
  p7?: [string, TFastdbCheckMethod, ...any[]]
  p8?: [string, TFastdbCheckMethod, ...any[]]
  p9?: [string, TFastdbCheckMethod, ...any[]]
  p10?: [string, TFastdbCheckMethod, ...any[]]
  p11?: [string, TFastdbCheckMethod, ...any[]]
  p12?: [string, TFastdbCheckMethod, ...any[]]
  p13?: [string, TFastdbCheckMethod, ...any[]]
  p14?: [string, TFastdbCheckMethod, ...any[]]
  p15?: [string, TFastdbCheckMethod, ...any[]]
  p16?: [string, TFastdbCheckMethod, ...any[]]
  p17?: [string, TFastdbCheckMethod, ...any[]]
  p18?: [string, TFastdbCheckMethod, ...any[]]
  p19?: [string, TFastdbCheckMethod, ...any[]]
  p20?: [string, TFastdbCheckMethod, ...any[]]
  p21?: [string, TFastdbCheckMethod, ...any[]]
  p22?: [string, TFastdbCheckMethod, ...any[]]
  p23?: [string, TFastdbCheckMethod, ...any[]]
  p24?: [string, TFastdbCheckMethod, ...any[]]
  p25?: [string, TFastdbCheckMethod, ...any[]]
  p26?: [string, TFastdbCheckMethod, ...any[]]
  p27?: [string, TFastdbCheckMethod, ...any[]]
  p28?: [string, TFastdbCheckMethod, ...any[]]
  p29?: [string, TFastdbCheckMethod, ...any[]]
  p30?: [string, TFastdbCheckMethod, ...any[]]
  p31?: [string, TFastdbCheckMethod, ...any[]]
  p32?: [string, TFastdbCheckMethod, ...any[]]
  p33?: [string, TFastdbCheckMethod, ...any[]]
  p34?: [string, TFastdbCheckMethod, ...any[]]
  p35?: [string, TFastdbCheckMethod, ...any[]]
  p36?: [string, TFastdbCheckMethod, ...any[]]
  p37?: [string, TFastdbCheckMethod, ...any[]]
  p38?: [string, TFastdbCheckMethod, ...any[]]
  p39?: [string, TFastdbCheckMethod, ...any[]]
  p40?: [string, TFastdbCheckMethod, ...any[]]
  p41?: [string, TFastdbCheckMethod, ...any[]]
  p42?: [string, TFastdbCheckMethod, ...any[]]
  p43?: [string, TFastdbCheckMethod, ...any[]]
  p44?: [string, TFastdbCheckMethod, ...any[]]
  p45?: [string, TFastdbCheckMethod, ...any[]]
  p46?: [string, TFastdbCheckMethod, ...any[]]
  p47?: [string, TFastdbCheckMethod, ...any[]]
  p48?: [string, TFastdbCheckMethod, ...any[]]
  p49?: [string, TFastdbCheckMethod, ...any[]]
  p50?: [string, TFastdbCheckMethod, ...any[]]
  p51?: [string, TFastdbCheckMethod, ...any[]]
  p52?: [string, TFastdbCheckMethod, ...any[]]
  p53?: [string, TFastdbCheckMethod, ...any[]]
  p54?: [string, TFastdbCheckMethod, ...any[]]
  p55?: [string, TFastdbCheckMethod, ...any[]]
  p56?: [string, TFastdbCheckMethod, ...any[]]
  p57?: [string, TFastdbCheckMethod, ...any[]]
  p58?: [string, TFastdbCheckMethod, ...any[]]
  p59?: [string, TFastdbCheckMethod, ...any[]]
  p60?: [string, TFastdbCheckMethod, ...any[]]
  p61?: [string, TFastdbCheckMethod, ...any[]]
  p62?: [string, TFastdbCheckMethod, ...any[]]
  p63?: [string, TFastdbCheckMethod, ...any[]]
  p64?: [string, TFastdbCheckMethod, ...any[]]
  p65?: [string, TFastdbCheckMethod, ...any[]]
  p66?: [string, TFastdbCheckMethod, ...any[]]
  p67?: [string, TFastdbCheckMethod, ...any[]]
  p68?: [string, TFastdbCheckMethod, ...any[]]
  p69?: [string, TFastdbCheckMethod, ...any[]]
  p70?: [string, TFastdbCheckMethod, ...any[]]
  p71?: [string, TFastdbCheckMethod, ...any[]]
  p72?: [string, TFastdbCheckMethod, ...any[]]
  p73?: [string, TFastdbCheckMethod, ...any[]]
  p74?: [string, TFastdbCheckMethod, ...any[]]
  p75?: [string, TFastdbCheckMethod, ...any[]]
  p76?: [string, TFastdbCheckMethod, ...any[]]
  p77?: [string, TFastdbCheckMethod, ...any[]]
  p78?: [string, TFastdbCheckMethod, ...any[]]
  p79?: [string, TFastdbCheckMethod, ...any[]]
  p80?: [string, TFastdbCheckMethod, ...any[]]
  p81?: [string, TFastdbCheckMethod, ...any[]]
  p82?: [string, TFastdbCheckMethod, ...any[]]
  p83?: [string, TFastdbCheckMethod, ...any[]]
  p84?: [string, TFastdbCheckMethod, ...any[]]
  p85?: [string, TFastdbCheckMethod, ...any[]]
  p86?: [string, TFastdbCheckMethod, ...any[]]
  p87?: [string, TFastdbCheckMethod, ...any[]]
  p88?: [string, TFastdbCheckMethod, ...any[]]
  p89?: [string, TFastdbCheckMethod, ...any[]]
  p90?: [string, TFastdbCheckMethod, ...any[]]
  p91?: [string, TFastdbCheckMethod, ...any[]]
  p92?: [string, TFastdbCheckMethod, ...any[]]
  p93?: [string, TFastdbCheckMethod, ...any[]]
  p94?: [string, TFastdbCheckMethod, ...any[]]
  p95?: [string, TFastdbCheckMethod, ...any[]]
  p96?: [string, TFastdbCheckMethod, ...any[]]
  p97?: [string, TFastdbCheckMethod, ...any[]]
  p98?: [string, TFastdbCheckMethod, ...any[]]
  p99?: [string, TFastdbCheckMethod, ...any[]]
  r?: string
}

export interface IMongodbCheckParams extends IMongodbPRList {
  page?: number
  limit?: number
  orderBy?: string[]
  select?: string[]
  groupBy?: string[]
}
export interface IMysqlCheckParams extends IMysqlPRList {
  page?: number
  limit?: number
  orderBy?: string[]
  select?: string[] | TJ[]
  groupBy?: string[]
}
export interface IFastdbCheckParams extends IFastdbPRList {
  page?: number
  limit?: number
}


export interface IMysqlCountParams extends IMysqlPRList {
  limit?: 1
}
export interface IMongodbCountParams extends IMongodbPRList {
  limit?: 1
}
export interface IFastdbCountParams extends IFastdbPRList {
  limit?: 1
}
export interface ICountRes {
  data: number
}

type TMongodbUpdateMethod = 'incr' | 'set' | 'unset' | 'geo' | 'append' | 'remove' | 'uAppend'
type TMysqlUpdateMethod = 'incr' | 'set' | 'unset'
type TFastdbUpdateMethod = 'incr' | 'set' | 'unset' | 'geo' | 'append' | 'remove' | 'uAppend'
type TRedisUpdateMethod = 'incr' | 'add' | 'set' | 'range' | 'endSec' | 'endMillisec' | 'endTime' | 'endMilliTime'
type dataType = string | string[] | number | number[] | boolean | boolean[] | null | undefined | {
  [propName: string] : any
} | {
  [index: number]: any
}

export type TSentence = 'sentence'

export interface IMongodbUpdateParams {
  [key: string]: [TMongodbUpdateMethod, dataType] | dataType
}
export interface IMysqlUpdateParams {
  [key: string]: [TMysqlUpdateMethod, dataType] | dataType
}
export interface IMysqlUpdateKey{
  [key: string]: string | number
}
export interface IRedisUpdateParams {
  [key: string]: [TRedisUpdateMethod, dataType] | dataType
}
export interface IRedisStringUpdateParams {
  [key: string]: ['incr' | 'add' | 'set' | 'range' | 'expireSec' | 'expireMillisec' | 'expireAt' | 'expireMilliAt', dataType] | dataType
}
export interface IFastdbUpdateParams {
  [key: string]: [TFastdbUpdateMethod, dataType] | dataType
}


type TMongodbSetMethod = 'geo'
export interface IMongodbSetParams {
  [key: string]: [TMongodbSetMethod, dataType] | dataType
}
export interface IMysqlSetParams {
  [key: string]: dataType
}
export interface IRedisSetQuery {
  expireSec?: number
  expireMillisec?: number
  expireAt?: number
  expireMilliAt?: number
}
export interface IFastdbParams {
  [key: string]: ['geo', dataType] | dataType
}



export interface IMysqlGetKey{
  [key: string]: string | number
}
export interface IMongodbGetQuery {
  select?: string | string[]
}
export interface IMysqlGetQuery {
  select?: string | string[]
}
export interface IRedisGetQuery {
  expireSec?: boolean
  expireMillisec?: boolean
}



export interface IMysqlDeleteParams extends IMysqlPRList {
  page?: number
  limit?: number
}
export interface IMongodbDeleteParams extends IMongodbPRList {
  page?: number
  limit?: number
}

//find方法的返回
export interface IMongodbFindRes {
  data: {
    objects: any[]
    [key: string]: any
  }
  [key: string]: any
}
export interface IMysqlFindRes {
  data: {
    objects: any[]
    [key: string]: any
  }
  [key: string]: any
}
export interface IFastdbFindRes {
  data: {
    objects: any[]
    [key: string]: any
  }
  [key: string]: any
}

//set返回
export interface IMongodbSetRes {
  data: {
    insertedId?: string | number
    [key: string]: any
  }
  [key: string]: any
}
export interface IMysqlSetRes {
  data: {
    insertId?: string | number
    [key: string]: any
  }
  [key: string]: any
}
export interface IRedisSetRes {
  data: any
  [key: string]: any
}
export interface IFastdbSetRes {
  data: {
    insertId?: string | number
    [key: string]: any
  }
  [key: string]: any
}



export interface IMysqlGetRes {
  data: {
    id?: string | number
    [key: string]: any
  }
  [key: string]: any
}
export interface IMongodbGetRes {
  data: {
    id?: string | number
    _id?: string | number
    [key: string]: any
  }
  [key: string]: any
}
export interface IRedisGetRes {
  data: {
    expireSec?: number
    expireMillisec?: number
    [key: string]: any
  }
  [key: string]: any
}
export interface IFastdbGetRes {
  data: {
    id?: string | number
    [key: string]: any
  }
  [key: string]: any
}





export interface IMysqlUpdateRes {
  data: {
    [key: string]: any
  }
  [key: string]: any
}
export interface IMongodbUpdateRes {
  data: {
    id?: string | number
    _id?: string | number
    [key: string]: any
  }
  [key: string]: any
}
export interface IRedisUpdateRes {
  data: any
  [key: string]: any
}
export interface IFastdbUpdateRes {
  data: {
    id?: string | number
    [key: string]: any
  }
  [key: string]: any
}



//delete
export interface IMysqlDeleteRes {
  data: {
    [key: string]: any
  }
  [key: string]: any
}
export interface IMongodbDeleteRes {
  data: {
    [key: string]: any
  }
  [key: string]: any
}
export interface IRedisDeleteRes {
  data: number
}
export interface IFastdbDeleteRes {
  data: number
}


// transiction
export interface IMysqlTransactionRes {
  begin: (callback: Function) => void
  run: (sql: string) => Promise<IMysqlGetRes | IMysqlSetRes | IMysqlFindRes | IMysqlDeleteRes | IMysqlUpdateRes>
  rollback: Function
  commit: () => Promise<boolean>
  locks: {
    shared_locks: string
    exclusive_locks: string
  }
}



// none (key不存在)
// string (字符串)
// list (列表)
// set (集合)
// zset (有序集)
// hash (哈希表)
// redis为数据结构
export type TStructure = 'string' | 'hash' | 'list' | 
'set' | 'zset'

export interface IRedisStringSet {
  [key: string]: any
}