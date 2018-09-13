/*
 * @Author: Lienren
 * @Date: 2018-09-05 20:15:49
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-09-08 11:33:56
 */
'use strict'

import Vue from 'vue'

export default {
  getWebSiteConfig (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/website/getconfig`, { ...body }, op)
  },
  saveWebSiteConfig (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/website/saveconfig`, { ...body }, op)
  },
  getDeps (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dep/getdeps`, { ...body }, op)
  },
  getDepList (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dep/getdeplist`, { ...body }, op)
  },
  addDep (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dep/adddep`, { ...body }, op)
  },
  delDep (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dep/deldep`, { ...body }, op)
  },
  getCLs (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/cl/getcls`, { ...body }, op)
  },
  getCL (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/cl/getcl`, { ...body }, op)
  },
  addCL (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/cl/addcl`, { ...body }, op)
  },
  editCL (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/cl/editcl`, { ...body }, op)
  },
  delCL (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/cl/delcl`, { ...body }, op)
  },
  getDors (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dor/getdors`, { ...body }, op)
  },
  getDorList (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dor/getdorlist`, { ...body }, op)
  },
  getDor (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dor/getdor`, { ...body }, op)
  },
  addDor (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dor/adddor`, { ...body }, op)
  },
  editDor (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dor/editdor`, { ...body }, op)
  },
  delDor (body, op = {}) {
    return Vue.$utils.Http.post(`/mpApi/bs/dor/deldor`, { ...body }, op)
  }
}
