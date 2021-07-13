import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/index'
import i18n from './vueI18n/i18n'
import axios from 'axios'
import './assets/style/Common/Font.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './assets/js/Common/API'

import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./assets/js/Common/drizzleOptions";
let drizzle = new Drizzle(drizzleOptions);
  //console.log(drizzle)
Vue.prototype.$drizzle = drizzle;
  
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.use(ElementUI);

//console.log("走了这里")

//消息提示
Vue.prototype.toast = function (type,msg){
  this.$message({
    showClose: true,
    message: msg,
    type:type
  });
}



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
