/*

    1. 页面跳转的时候,判断本地有没有token
        1.1 没有
                --- 跳转到登录页
        1.2 有
                --- 判断是否成功获取用户信息
                    
                    1.2.1 成功获取
                                    --- 跳转到首页
                    1.2.2 获取失败
                                    --- 重新登录
*/

//引入路由对象
import router from "./router"

//引入登录模块的api
import loginApi from "./api/login"


//创建路由守卫 --- 只要路由跳转的时候,就会触发
// to 即将要进入的目标路由对象
// from 当前导航正要离开的路由对象
// next 调用该方法，进入目标路由
router.beforeEach((to,from,next)=>{
    //获取本地存储的token
    const token = localStorage.getItem("token");

    //判断 没有token
    if(!token){
        //要跳转的是非登录页
        if(to.path !== "/login"){
            localStorage.removeItem("info");
            next("/login")
        }else{
           next(); 
        }
    }else{
        //有token的情况下判断他是否进入到登录页
        if(to.path == "/login"){
            next();
        }else{
            //如果有token,但是进入的不是登录页,先判断本地有没有用户的信息
            //获取本地存储的用户信息
            const info = localStorage.getItem("info");

            //判断是否有用户信息
            if(info){
                next();
            }else{
                loginApi.wxInfo().then(res=>{
                    if(res.code == 200){
                        localStorage.setItem("info",JSON.stringify(res.data.rows));
                        next();
                    }else{
                        localStorage.removeItem("token")
                        next("/login")
                    }
                })
            }    
        }
    }
})


