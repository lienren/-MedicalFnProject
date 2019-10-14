/*
 * @Author: Lienren
 * @Date: 2018-12-07 12:08:41
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-10-13 22:19:19
 */
'use strict'

import Vue from 'vue'

export default {
  getAttr (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getAttr`, { ...body }, op)
  },
  delAttr (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delAttr`, { ...body }, op)
  },
  addAttr (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addAttr`, { ...body }, op)
  },
  delAttrValue (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delAttrValue`, { ...body }, op)
  },
  addAttrValue (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addAttrValue`, { ...body }, op)
  },
  getBusinessUser (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getBusinessUser`, { ...body }, op)
  },
  addBusinessUser (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addBusinessUser`, { ...body }, op)
  },
  editBusinessUser (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/editBusinessUser`, { ...body }, op)
  },
  delBusinessUser (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delBusinessUser`, { ...body }, op)
  },
  getUser (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getUser`, { ...body }, op)
  },
  delUser (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delUser`, { ...body }, op)
  },
  getPlayGroup (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayGroup`, { ...body }, op)
  },
  getPlayGroupDetail (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayGroupDetail`, { ...body }, op)
  },
  addPlayGroup (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addPlayGroup`, { ...body }, op)
  },
  editPlayGroup (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/editPlayGroup`, { ...body }, op)
  },
  delPlayGroup (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delPlayGroup`, { ...body }, op)
  },
  getPlaySite (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlaySite`, { ...body }, op)
  },
  getPlaySiteDetail (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlaySiteDetail`, { ...body }, op)
  },
  addPlaySite (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addPlaySite`, { ...body }, op)
  },
  editPlaySite (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/editPlaySite`, { ...body }, op)
  },
  delPlaySite (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delPlaySite`, { ...body }, op)
  },
  getPlayActivity (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayActivity`, { ...body }, op)
  },
  getPlayActivityDetail (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayActivityDetail`, { ...body }, op)
  },
  addPlayActivity (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addPlayActivity`, { ...body }, op)
  },
  editPlayActivity (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/editPlayActivity`, { ...body }, op)
  },
  delPlayActivity (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delPlayActivity`, { ...body }, op)
  },
  getPlayParentChild (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayParentChild`, { ...body }, op)
  },
  getPlayParentChildDetail (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayParentChildDetail`, { ...body }, op)
  },
  addPlayParentChild (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addPlayParentChild`, { ...body }, op)
  },
  editPlayParentChild (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/editPlayParentChild`, { ...body }, op)
  },
  delPlayParentChild (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delPlayParentChild`, { ...body }, op)
  },
  getPlayCase (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayCase`, { ...body }, op)
  },
  getPlayCaseDetail (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayCaseDetail`, { ...body }, op)
  },
  addPlayCase (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addPlayCase`, { ...body }, op)
  },
  editPlayCase (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/editPlayCase`, { ...body }, op)
  },
  delPlayCase (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delPlayCase`, { ...body }, op)
  },
  getIndexBannerLink (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getIndexBannerLink`, { ...body }, op)
  },
  setIndexBannerLink (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/setIndexBannerLink`, { ...body }, op)
  },
  getIndexBigBannerLink (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getIndexBigBannerLink`, { ...body }, op)
  },
  setIndexBigBannerLink (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/setIndexBigBannerLink`, { ...body }, op)
  },
  getWxIndexBigBannerLink (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getWxIndexBigBannerLink`, { ...body }, op)
  },
  setWxIndexBigBannerLink (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/setWxIndexBigBannerLink`, { ...body }, op)
  },
  getOrder (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getOrder`, { ...body }, op)
  },
  updateOrderState (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/updateOrderState`, { ...body }, op)
  },
  addOrderRemark (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addOrderRemark`, { ...body }, op)
  },
  getOrderRemark (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getOrderRemark`, { ...body }, op)
  },
  getPlayTourYe (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayTourYe`, { ...body }, op)
  },
  getPlayTourYeDetail (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/getPlayTourYeDetail`, { ...body }, op)
  },
  addPlayTourYe (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/addPlayTourYe`, { ...body }, op)
  },
  editPlayTourYe (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/editPlayTourYe`, { ...body }, op)
  },
  delPlayTourYe (body, op = {}) {
    return Vue.$utils.Http.post(`/youngplay/delPlayTourYe`, { ...body }, op)
  }
}
