import request from "../utils/request"

export default {
    //登录接口
    login(name,pass){
        return request({
            url : "/user/login",
            method : "post",
            data : {
                username : name,
                userpass : pass
            }
        })
    },
    //获取用户信息接口
    getUserInfo(){
        return request({
            url : "/user/info"
        })
    }
}

