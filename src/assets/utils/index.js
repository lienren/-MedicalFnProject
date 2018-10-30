/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:50:10
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-10-29 22:38:56
 */
'use strict';

import Common from './common.js';
import Http from './http.js';
import Store from './localStorage.js';
import Date from './date.js';
import Excel from './excel.js'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      Common,
      Http,
      Store,
      Date,
      Excel
    };
  } else {
    Vue.$utils = {
      Common,
      Http,
      Store,
      Date,
      Excel
    };
  }

  Vue.mixin({
    created() {
      this.$utils = {
        Common,
        Http,
        Store,
        Date,
        Excel
      };
    }
  });
}
