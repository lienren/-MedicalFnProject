/*
 * @Author: Lienren
 * @Date: 2018-08-19 11:12:19
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-19 23:24:57
 */
'use strict'

import Vue from 'vue'

export default {
  getImageCode (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/base/getimagecode`, { ...body }, op)
  },
  login (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/login`, { ...body }, op)
  },
  setPassword (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/setpassword`, { ...body }, op)
  },
  getManagers (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getmanagers`, { ...body }, op)
  },
  addManager (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/addmanager`, { ...body }, op)
  },
  editManager (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/editmanager`, { ...body }, op)
  },
  editManagerState (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/editmanagerstate`, { ...body }, op)
  },
  delManager (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/delmanager`, { ...body }, op)
  }
}
