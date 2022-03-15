import count_temp from './count'
import del_temp from './del'
import delmany_temp from './delmany'
import find_temp from './find'
import get_temp from './get'
import publish_temp from './publish'
import queue_temp from './queue'
import set_temp from './set'
import setmany_temp from './setmany'
import subscribe_temp from './subscribe'
import transaction_temp from './transaction'
import update_temp from './update'

export default {
  count: count_temp,
  del: del_temp,
  delmany: delmany_temp,
  find: find_temp,
  get: get_temp,
  publish: publish_temp,
  queue: queue_temp,
  set: set_temp,
  setmany: setmany_temp,
  subscribe: subscribe_temp,
  transaction: transaction_temp,
  update: update_temp,
}