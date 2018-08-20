/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:30:45
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-19 13:31:09
 */
'use strict'

import codes from './httpresultcode'
import { message } from 'ant-design-vue'

export default {
  ErrorMsg (code, msg) {
    if (
      window.$globalHub.$route.path !== '/' &&
      window.$globalHub.$route.path !== '/login' &&
      codes.AUTH_ERROR.some(x => x === code)
    ) {
      message.error(`传输异常，请稍后再试！${msg}`)
    } else {
      message.error(`${msg}`)
    }
  }
}
