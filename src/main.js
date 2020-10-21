import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "@/assets/styles/el-reset.css";
import "@/assets/styles/base.css";


Vue.config.productionTip = false;

Vue.use(ElementUI);


//路由前置钩子(导航守卫)
//放行后才能看到页面，导航守卫管理页面的显示
router.beforeEach((to,from,next)=>{
  //to是想去哪个页面
  // 写完一段逻辑，next是放行的，让下边的函数执行
  // next();

  //用户登录之后，localStorage有token
  let token=localStorage.getItem("qf2005-token");
  if(token){
      next();
  }else{   //没token，分是登录页和不是登录页
      //to是一个对象
      if(to.path==="/"){  //如果是登录页，直接放行
          next();
      }else{
          //访问的不是登录页，就被拦截，跳转到登录页
          next({path:"/"});
      }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
