module.exports = {
  lintOnSave: false,
  devServer: {
    // // 设置项目端口号
    // port:1234,
    // // 允许所有的主机访问当前项目
    // host:"0.0.0.0", 
    proxy:{
        // 以后只要看到/api开头的，就把它替换为http://www.chst.vip
        '/api':{ 
            // 指向的是目标服务器
            target:"http://www.chst.vip", 
            changeOridin:true,
            pathRewrite:{ //路径重写
                '^/api':""
            }
        }
    }
}
};
