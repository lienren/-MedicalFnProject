/*
 * @Author: Lienren
 * @Date: 2018-10-24 20:57:01
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-10-29 08:42:37
 */
'use strict'

import Vue from 'vue'

export default {
  getIntermediary (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/intermediary/get`, { ...body }, op)
  },
  searchIntermediary (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/intermediary/search`, { ...body }, op)
  },
  addIntermediary (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/intermediary/add`, { ...body }, op)
  },
  editIntermediary (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/intermediary/edit`, { ...body }, op)
  },
  delIntermediary (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/intermediary/del`, { ...body }, op)
  },
  verfiyIntermediary (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/intermediary/verfiy`, { ...body }, op)
  },
  getLoanuser (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanuser/get`, { ...body }, op)
  },
  searchLoanuser (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanuser/search`, { ...body }, op)
  },
  addLoanuser (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanuser/add`, { ...body }, op)
  },
  editLoanuser (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanuser/edit`, { ...body }, op)
  },
  delLoanuser (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanuser/del`, { ...body }, op)
  },
  verfiyLoanuser (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanuser/verfiy`, { ...body }, op)
  },
  getLoanorder (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/getloanorder`, { ...body }, op)
  },
  getLoanorderdetail (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/getloanorderdetail`, { ...body }, op)
  },
  addLoanorder (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/addloanorder`, { ...body }, op)
  },
  addLoanorderState (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/addloanorderstate`, { ...body }, op)
  },
  getLoanorderState (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/getloanorderstate`, { ...body }, op)
  },
  getStsOrders (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/getstsorders`, { ...body }, op)
  },
  getStsOrdersAll (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/getstsordersall`, { ...body }, op)
  },
  getStsOrderSort (body, op = {}) {
    return Vue.$utils.Http.post(`/credit/loanorder/getstsordersort`, { ...body }, op)
  }
}
