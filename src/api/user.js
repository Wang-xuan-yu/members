import request from "../utils/request"

export default {
    //获取列表分页接口
    getUserList(offset,limit){
        return request({
            url : "https://elm.cangdu.org/v1/users/list",
            method : "get",
            params : {
                // offset : offset,
                // limit : limit
                offset,
                limit
            }
        })
    },
    //获取总条数接口
    getCount(){
        return request({
            url : "https://elm.cangdu.org/v1/users/count",
            method : "get"
        })
    }
}