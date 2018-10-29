/*
 * @Author: Lienren
 * @Date: 2018-08-19 11:12:19
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-10-29 08:42:33
 */
'use strict'

import Vue from 'vue'

export default {
  getImageCode (body, op = {}) {
    return Vue.$utils.Http.post(`/base/getimagecode`, { ...body }, op)
  },
  login (body, op = {}) {
    return Vue.$utils.Http.post(`/super/login`, { ...body }, op)
  },
  getManagerMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getmanagermenu`, { ...body }, op)
  },
  setPassword (body, op = {}) {
    return Vue.$utils.Http.post(`/super/setpassword`, { ...body }, op)
  },
  getManagers (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getmanagers`, { ...body }, op)
  },
  addManager (body, op = {}) {
    return Vue.$utils.Http.post(`/super/addmanager`, { ...body }, op)
  },
  editManager (body, op = {}) {
    return Vue.$utils.Http.post(`/super/editmanager`, { ...body }, op)
  },
  editManagerState (body, op = {}) {
    return Vue.$utils.Http.post(`/super/editmanagerstate`, { ...body }, op)
  },
  delManager (body, op = {}) {
    return Vue.$utils.Http.post(`/super/delmanager`, { ...body }, op)
  },
  getManagerRole (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getmanagerrole`, { ...body }, op)
  },
  setManagerRole (body, op = {}) {
    return Vue.$utils.Http.post(`/super/setmanagerrole`, { ...body }, op)
  },
  getRoles (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getroles`, { ...body }, op)
  },
  addRole (body, op = {}) {
    return Vue.$utils.Http.post(`/super/addrole`, { ...body }, op)
  },
  delRole (body, op = {}) {
    return Vue.$utils.Http.post(`/super/delrole`, { ...body }, op)
  },
  getRoleMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getrolemenu`, { ...body }, op)
  },
  setRoleMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/super/setrolemenu`, { ...body }, op)
  },
  getMenus (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getmenus`, { ...body }, op)
  },
  getMenuList (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getmenulist`, { ...body }, op)
  },
  addMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/super/addmenu`, { ...body }, op)
  },
  delMenu (body, op = {}) {
    return Vue.$utils.Http.post(`/super/delmenu`, { ...body }, op)
  },
  getLogs (body, op = {}) {
    return Vue.$utils.Http.post(`/super/getlogs`, { ...body }, op)
  }
}
