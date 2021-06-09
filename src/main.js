import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/index'
import i18n from './vueI18n/i18n'
import axios from 'axios'
import './assets/style/Common/Font.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI);



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
