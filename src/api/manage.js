/*
 * @Author: Lienren
 * @Date: 2018-08-19 11:12:19
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-21 19:10:04
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
  getManagerMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getmanagermenu`, { ...body }, op)
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
  },
  getManagerRole (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getmanagerrole`, { ...body }, op)
  },
  setManagerRole (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/setmanagerrole`, { ...body }, op)
  },
  getRoles (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getroles`, { ...body }, op)
  },
  addRole (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/addrole`, { ...body }, op)
  },
  delRole (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/delrole`, { ...body }, op)
  },
  getRoleMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getrolemenu`, { ...body }, op)
  },
  setRoleMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/setrolemenu`, { ...body }, op)
  },
  getMenus (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getmenus`, { ...body }, op)
  },
  getMenuList (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getmenulist`, { ...body }, op)
  },
  addMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/addmenu`, { ...body }, op)
  },
  delMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/delmenu`, { ...body }, op)
  },
  getLogs (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/super/getlogs`, { ...body }, op)
  }
}
