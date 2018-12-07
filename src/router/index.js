/*
 * @Author: Lienren
 * @Date: 2018-08-19 10:08:43
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-12-07 12:01:24
 */
'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import config from '../../config/index'

Vue.use(Router)

export default new Router({
  base: config.build.assetsPublicPath,
  routes
})
