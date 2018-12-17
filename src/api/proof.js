/*
 * @Author: Lienren
 * @Date: 2018-12-07 12:08:41
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-12-17 23:18:09
 */
'use strict'

import Vue from 'vue'

export default {
  getLoans (body, op = {}) {
    return Vue.$utils.Http.post(`/proof/getLoans`, { ...body }, op)
  },
  setAllLoanState (body, op = {}) {
    return Vue.$utils.Http.post(`/proof/setAllLoanState`, { ...body }, op)
  },
  getUsers (body, op = {}) {
    return Vue.$utils.Http.post(`/proof/getUsers`, { ...body }, op)
  },
  setUserState (body, op = {}) {
    return Vue.$utils.Http.post(`/proof/setUserState`, { ...body }, op)
  },
  getProofConfig (body, op = {}) {
    return Vue.$utils.Http.post(`/proof/getProofConfig`, { ...body }, op)
  },
  setProofConfig (body, op = {}) {
    return Vue.$utils.Http.post(`/proof/setProofConfig`, { ...body }, op)
  },
  getStsOrdersAll (body, op = {}) {
    return Vue.$utils.Http.post(`/proof/getStsOrdersAll`, { ...body }, op)
  }
}
