//设置axios的一些配置

import axios from "axios";

import { Loading } from 'element-ui';

import router from "../router/index"

//封装loading加载
const loading = {
  loadingInstance : null,
  open(){
    if(this.loadingInstance === null){
      this.loadingInstance = Loading.service({
        target : ".main",
        text : "正在加载中",
        background : "rgba(0,0,0,0.5)"
      });
    }
  },
  close(){
    if(this.loadingInstance !== null){
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  }
} 


//创建axios实例,在axios实例里面可以自定义一些请求的选项
const request = axios.create({
    //设置公共路径
    baseURL : process.env.VUE_APP_BASE_API ,
    //设置请求的超时时间
    timeout : 5000
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {

    //进行loading加载
    loading.open();

    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

    //发送token
    config.headers.Authorization ="Bearer " + token;


    console.log("请求拦截")
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    //关闭loading加载
    loading.close();

    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    //关闭loading加载
    loading.close();
    if(response.data.code == "202"){
      localStorage.removeItem("token");ss
      localStorage.removeItem("info");
      router.push({path : "/login"})
    }

    console.log("响应拦截")
    // 对响应数据做点什么
    return response;
  }, function (error) {
    //关闭loading加载
    loading.close();

    // 对响应错误做点什么
    return Promise.reject(error);
  });


//导出axios实例对象
export default request;