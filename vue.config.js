module.exports = {
    // 设置路径
    publicPath : "./",
    //配置服务器
    devServer : {
        port : 8888, //设置端口号
        https : false,  //不开启https协议
        host : "localhost", //设置主机名
        open : true, //自动打开浏览器
        proxy : {   //配置解决跨域
            [process.env.VUE_APP_BASE_API] : {
                target : process.env.VUE_APP_SERVICE_URL,  // 代理的地址
                changeOrigin : true,        //开启代理
                pathRewrite : {
                    ["^" + process.env.VUE_APP_BASE_API] : ""
                }
            }
        }
    },
    //关闭eslint
    lintOnSave : false,
    //打包时不生成.map文件
    productionSourceMap : false
}