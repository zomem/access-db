

export const INIT_ENV_ERROR = 'Make sure that variables such as HOST are defined in the .env file.'


export const FIND_R_ERROR = 'Lookup rule r is not defined.'
export const FIND_CHECKR_ERROR = 'The brackets in the search rule r do not correspond (in pairs).'

export const UPDATE_ERROR = 'The params(params) is not in the correct format.'

export const FIND_P_ERROR = 'The p parameter (p0-p19) is wrong.'
export const FIND_NO_PJ_ERROR = 'Undefined parameter:'
export const FIND_J_ERROR = 'The j parameter (j0 ~ j5) is wrong.'

// mysql in not in等，参数必须为有值数组
export const PARAMS_NOT_ARR_ERROR = 'The params should be array.'
export const PARAMS_EMPTY_ARR_ERROR = 'The params should be array, and not empty.'

//redis 
export const QUEUE_METHOD_ERROR = 'The Redis queue method is not defined.'

//geo
export const GEO_POLYGON_ERROR = 'Polygon type, the number of points should be at least 3, and the first and last points should be the same. So the length of the passed in parameter is at least 4.'
export const PARAM_TABLE_ERROR = 'The table parameter cannot be empty.'



//between参数个数
export const FIND_P_BETWEEN_ERROR = 'The between method requires two parameters.'

//join
export const FIND_J_JOIN_ERROR = 'The join method requires two fields.'

//setMany
export const SET_MANY_PARAMS_ARR_ERROR = 'The params method argument should be array object.'

//事务错误
export const TRAN_P_ERROR = 'The transaction parameter list is an array and cannot be empty.'



// fastdb 
export const FASTDB_FILE_ERROR = 'Table(a json file) not exists.'
export const FASTDB_GET_ID_ERROR = 'The id should not be undefined.'
export const FASTDB_HAVE_ID_ERROR = 'The id is already exists.'
export const FASTDB_UPDATE_ID_ERROR = 'The id can not be a param.'
export const FASTDB_UPDATE_JSON_ERROR = 'The parmas name use too many point.'


// mongodb
export const ID_EMPTY_ERROR = 'The update/updatemany method, key(exp: _id) could not be empty'


// select should be array
export const SELECT_NOT_ARRAY = 'The find params.select must be array.'
// orderBy should be array
export const ORDER_BY_NOT_ARRAY = 'The find params.orderBy must be array.'