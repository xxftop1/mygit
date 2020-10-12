// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import "babel-polyfill";
// import elementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import {getRequest} from './utils/api'
import {uploadFileRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {apis} from './utils/apis'
import {putRequest} from './utils/api'
import {getPageNum} from './utils/utils'
import {checkLinkShow} from './utils/utils'
import {checkButtonShow} from './utils/utils'
import {getDeptType} from './utils/utils'
import {isJyj} from './utils/utils'
import {jsGetAge} from './utils/utils'
import {formatLastMonth} from './utils/utils'

import  arteryUi  from '@com.thunisoft.artery/artery-ui';
import '@com.thunisoft.artery/artery-ui/dist/styles/artery-ui.css';
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/assistant.css'
import './assets/css/restArteryUi.css'
import './assets/css/media.css'
import './assets/js/jquery.min.js'
import './utils/constants.js'

import { HappyScroll } from 'vue-happy-scroll'
Vue.component('happy-scroll', HappyScroll)
import '../static/lib/happy-scroll.css'

Vue.config.productionTip = false

Vue.use(arteryUi);

Vue.prototype.getRequest = getRequest
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.apis = apis;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getPageNum = getPageNum;
Vue.prototype.checkLinkShow = checkLinkShow;
Vue.prototype.checkButtonShow = checkButtonShow;
Vue.prototype.getDeptType = getDeptType;
Vue.prototype.isJyj = isJyj;
Vue.prototype.jsGetAge = jsGetAge;
Vue.prototype.formatLastMonth = formatLastMonth;
Array.prototype.contains = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) {
      return true;
    }
  }
  return false;
};
Array.prototype.uniquelize = function(){
  var ra = new Array();
  for(var i = 0; i < this.length; i ++){
    if(!ra.contains(this[i])){
      ra.push(this[i]);
    }
  }
  return ra;
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
