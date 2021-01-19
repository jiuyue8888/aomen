// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import { Swipe, SwipeItem,PasswordInput, NumberKeyboard,Toast,Field,Tab, Tabs  } from 'vant';
import 'vant/lib/index.css';
import VConsole from 'vconsole'

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Field);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.config.productionTip = false
console.log(process.env.NODE_ENV)
window.localStorage.setItem('env','test')
/*
const local = window.location.host;
const dev = 'http://api.mtown.me';
const test = 'http://api.dev.macaotown.com';
const pro = 'http://api.macaotown.com';
*/
if(window.localStorage.getItem('env') == 'test'){  // 生产环境
  new VConsole() // 初始化
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
