<template>
  <div class="login">
      <!-- status-icon是否在输入框中显示校验结果反馈图标，类型布尔     rules表单验证规则，类型是对象-->
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <h1>千锋管理系统</h1>
          <!-- 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          </el-form-item>
      </el-form>
      <video src="./bg_video.d2d602a9.mp4" class="v" autoplay="autoplay" loop="loop" muted="muted" preload="auto"></video>
  </div>
</template>

<script>
  // 登录逻辑
    // 1.收集用户名密码传给后端
    // 2.将后端给的token存在本地,跳转到主页
    // 3.请求的时候携带token
    // 4.展示token校验正确的数据
    // 5.校验如果不通过，还是到登录页

  import {login} from "@/api";
  import {mapMutations} from "vuex";

  export default {
    data() {
      // 下边这是jsDoC的注释
      /**
       * @param {Object} rule字段就是一个表单验证对象，可以得到一些消息
       * @param {String} value字段是输入值 
       * @param {Function} callback字段是校验通过不传参，不通过才传参
       */
      var validateUsername = (rule, value, callback) => {
          //用户名正则校验
          // var uPattern=/^[a-zA-Z0-9]{3,16}$/;
          if(!value){
              callback("3到16位数字、字母、下划线、减号等");
          }else{
              callback();
          }
      };
      var validatePassword = (rule, value, callback) => {
        if(!value){
              callback("请输入密码");
          }else{
              callback();
          }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          // 上边表单的prop的username与rules中的username进行对应，就可以对当前表单进行校验
          username: [
            // validator是校验的函数，trigger是触发的条件
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        //this.$refs[forName]打印出来是VueComponent对象,有validate方法
        this.$refs[formName].validate((valid) => {
          //代表本地校验通过，本地校验通过后才能向服务器发请求进行服务器端校验
          if (valid) {
            //本地校验通过，才会打开加载动画,将官网的样式放过来
            const loading = this.$loading({
                lock: true,
                text: '正在登录',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            //打印出用户输入的用户名和密码
            // console.log(this.loginForm.username,this.loginForm.password);
            //为了方便，将loginForm的username和password解构出来
            let {username,password}=this.loginForm;

            //发送登录请求
            //调用导入的login接口，传入用户名密码
            login(username,password).then(res=>{
                //只要得到响应，就关闭加载动画
                loading.close();
            
                //登录成功返回的数据中才有token
                // console.log(res);
                if(res.data.state){
                  this.$message.success("登录成功");
                  //用户名密码正确，将得到的token存入本地
                  localStorage.setItem("qf2005-token",res.data.token);
                  //将用户信息存在本地
                  localStorage.setItem("qf2005-userInfo",JSON.stringify(res.data.userInfo));
                  //更改vuex中state中的userInfo的值
                  this.SET_USERINFO(res.data.userInfo);
                  //跳转到主页
                  this.$router.push("/home");
                }else{
                   //用户名密码错误
                   this.$message.error("用户名密码错误");
                }
            }).catch(err=>{
                console.log(err);
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //映射mutations
      ...mapMutations(['SET_USERINFO'])
    }
  }
</script>

<style scoped>
  .login{
    width: 100%;
    height: 100%;
  }
  /* 表单样式 */
  .el-form{
        width:400px;
        height:387px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 11px;
        position: absolute;
        top:10%;
        right:10%;
        padding-top:100px;
        z-index:1;
  }
  .login h1{
      text-align: center;
      color: #fff;
      margin-bottom:50px;
  }
  .el-button{
      width: 248px;
      height: 40px;
      background:linear-gradient(30deg,#1596fb,#002dff);
    }

    
</style>