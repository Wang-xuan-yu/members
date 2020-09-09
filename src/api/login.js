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
    //网校登录接口
    wxLogin(data){
        return request({
            url : "http://120.53.31.103:84/api/adminUser/login",
            method : "post",
            data : data
        })
    },
    //网校用户信息接口
    wxInfo(){
        return request({
            url : "http://120.53.31.103:84/api/menu/info",
            method : "post"
        })
    },
    //获取用户信息接口
    getUserInfo(){
        return request({
            url : "/user/info"
        })
    }
}

