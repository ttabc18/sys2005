import axios from "axios";
import router from "../router";

import ElementUI from "element-ui";

//定义基础地址
axios.defaults.baseURL=process.env.NODE_ENV === 'development' ? "/api":"http://www.chst.vip";


//允许请求携带认证
axios.defaults.withCredentials = true;


// 创建请求拦截器，可以给每个请求携带想要传递的内容
axios.interceptors.request.use(config=>{
    //config是每个请求对象
    // console.log(config);

    //登录注册请求不需要携带token,直接放行
    if(config.url=="users/login"){
        return config;
    }else{
        let token=localStorage.getItem("qf2005-token");
        config.headers['authorization']=token;
        return config;
    }

    
    //放行
    // return config;
})



//响应拦截
axios.interceptors.response.use(config=>{
    let {data}=config;
    //10022是session到期失效
    if(data.code=='1004' || data.code=="10022"){
        //token失效，做其他操作时会退出调到登录页
        //1004是后端定义的，不一样的后端定义的数字不一样
        //当前的后台api中1004代表token校验失败，提示错误，并且跳转到登录页
        //要改变提示信息样式，需要再引入element-ui
        ElementUI.Message.error("登录信息失效，请重新登录");
        //但是跳转需要引入router
        //已经拿到router了，不需要this.$router
        router.push("/");
    }
    return config;
})



axios.create({
    timeout:4000
});



export default axios;