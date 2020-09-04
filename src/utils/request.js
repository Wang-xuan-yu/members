//设置axios的一些配置

import axios from "axios";

// axios.get("http://localhost:8888/db.json").then(res=>{
//     console.log(res)
// })

// axios.get("/db.json").then(res=>{
//     console.log(res)
// })


//创建axios实例,在axios实例里面可以自定义一些请求的选项
const request = axios.create({
    //设置公共路径
    baseURL : process.env.VUE_APP_BASE_API ,
    //设置请求的超时时间
    timeout : 5000
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const token = localStorage.getItem("yy_token") ? localStorage.getItem("yy_token") : "";
    //发送token
    config.headers.Authorization = token;
    console.log("请求拦截")
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    console.log("响应拦截")
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


// request.get("/db.json").then(res=>{
//     console.log(res)
// })

//导出axios实例对象
export default request;