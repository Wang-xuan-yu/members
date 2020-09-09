/*

*/

import router from "./router"

import loginApi from "./api/login"

router.beforeEach((to,from,next)=>{
    if(to.meta.oAuth){
        const token = localStorage.getItem("token");
        if(!token){
            next("/login")
        }else{
            const info = localStorage.getItem("info");
            if(info){
                next();
            }else{
                loginApi.wxInfo().then(res=>{
                    if(res.code == 200){
                        localStorage.setItem("info",JSON.stringify(res.data.rows));
                        next();
                    }else{
                        next("/login")
                    }
                })
            }
        }
    }else{
        next();
    }
})