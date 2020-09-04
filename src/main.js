import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

console.log(process.env.VUE_APP_SERVICE_URL);

// 消息提示的环境配置，是否为生产环境： // false 开发环境：Vue会提供很多警告来方便调试代码。 // true 生产环境：警告却没有用，反而会增加应用的体积
Vue.config.productionTip = process.env.NODE_ENV == "production";

//引入element-ui
import ElementUI from 'element-ui';
//引入element-ui css库
import 'element-ui/lib/theme-chalk/index.css';

//对element ui 进行注册
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
