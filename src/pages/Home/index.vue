<template>
  <div class="home">
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-header>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light"><span>千锋管理系统</span></div></el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <!-- 加头像 -->
                      <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                      <span>欢迎您:</span>
                      <b class="nickname" style="margin-right:20px">{{userInfo.nickname}}</b>
                      <span class="quit" @click="quit">退出</span>
                  </div>
                </el-col>
              </el-row>
          </el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
  </div>
</template>

<style>
    .quit{
        cursor: pointer;
        color: hotpink;
    }
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }




  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /* background-color: #f9fafc; */
  }



  .el-avatar.el-avatar--circle{
      vertical-align: middle;
      margin-right:20px;
  }
</style>



<script>
    import {getLoginLog} from "@/api";

    import {mapState} from "vuex";

    export default{
        mounted () {
          getLoginLog().then(res=>{
              console.log(res);
          })
        },
        computed: {
          ...mapState(['userInfo'])
        },
        methods: {
          quit(){
              //清除token和userInfo
              //跳转到登录页
              localStorage.removeItem("qf2005-token");
              localStorage.removeItem("qf2005-userInfo");
              this.$router.push("/");
          }

        }
    }
</script>
